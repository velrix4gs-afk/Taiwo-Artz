// context/CartContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export type CartItem = {
    id: string
    title: string
    price: number
    image_url: string
    quantity: number
    type: 'print' | 'original'
    artwork_id?: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => Promise<void>
    removeFromCart: (id: string) => Promise<void>
    updateQuantity: (id: string, quantity: number) => Promise<void>
    clearCart: () => Promise<void>
    totalItems: number
    totalPrice: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    // Fetch cart from Supabase when user logs in
    useEffect(() => {
        const fetchCart = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setCart([])
                setLoading(false)
                return
            }

            // Get or create cart for user
            let { data: cartData } = await supabase
                .from('carts')
                .select('id')
                .eq('user_id', user.id)
                .single()

            if (!cartData) {
                const { data: newCart } = await supabase
                    .from('carts')
                    .insert({ user_id: user.id })
                    .select('id')
                    .single()
                cartData = newCart
            }

            if (cartData) {
                const { data: items } = await supabase
                    .from('cart_items')
                    .select('*')
                    .eq('cart_id', cartData.id)

                setCart(items?.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image_url: item.image_url,
                    quantity: item.quantity,
                    type: item.type,
                    artwork_id: item.artwork_id
                })) || [])
            }
            setLoading(false)
        }

        fetchCart()

        // Listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchCart()
            } else {
                setCart([])
            }
        })

        return () => listener?.subscription.unsubscribe()
    }, [supabase])

    const getCartId = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Not logged in')

        let { data: cartData } = await supabase
            .from('carts')
            .select('id')
            .eq('user_id', user.id)
            .single()

        if (!cartData) {
            const { data: newCart } = await supabase
                .from('carts')
                .insert({ user_id: user.id })
                .select('id')
                .single()
            cartData = newCart
        }
        return cartData!.id
    }

    const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'>) => {
        try {
            const cartId = await getCartId()

            // Check if item already exists
            const { data: existing } = await supabase
                .from('cart_items')
                .select('*')
                .eq('cart_id', cartId)
                .eq('artwork_id', item.artwork_id)
                .eq('type', item.type)
                .single()

            if (existing) {
                await supabase
                    .from('cart_items')
                    .update({ quantity: existing.quantity + 1 })
                    .eq('id', existing.id)
            } else {
                await supabase
                    .from('cart_items')
                    .insert({
                        cart_id: cartId,
                        artwork_id: item.artwork_id,
                        title: item.title,
                        price: item.price,
                        image_url: item.image_url,
                        type: item.type,
                        quantity: 1
                    })
            }

            // Refresh cart
            const { data: items } = await supabase
                .from('cart_items')
                .select('*')
                .eq('cart_id', cartId)

            setCart(items?.map(i => ({ ...i, id: i.id })) || [])
            setIsCartOpen(true)
            router.refresh()
        } catch (error) {
            console.error('Add to cart error:', error)
        }
    }

    const removeFromCart = async (id: string) => {
        try {
            await supabase.from('cart_items').delete().eq('id', id)
            setCart(prev => prev.filter(i => i.id !== id))
            router.refresh()
        } catch (error) {
            console.error('Remove from cart error:', error)
        }
    }

    const updateQuantity = async (id: string, quantity: number) => {
        if (quantity <= 0) {
            await removeFromCart(id)
            return
        }
        try {
            await supabase.from('cart_items').update({ quantity }).eq('id', id)
            setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
            router.refresh()
        } catch (error) {
            console.error('Update quantity error:', error)
        }
    }

    const clearCart = async () => {
        try {
            const cartId = await getCartId()
            await supabase.from('cart_items').delete().eq('cart_id', cartId)
            setCart([])
            router.refresh()
        } catch (error) {
            console.error('Clear cart error:', error)
        }
    }

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0)

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            isCartOpen,
            setIsCartOpen,
            loading
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}