// components/CartSidebar.tsx
'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart()

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsCartOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col`}
                initial={{ x: '100%' }}
                animate={{ x: isCartOpen ? 0 : '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-serif font-semibold">Your cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">Your cart is empty</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 border-b pb-4">
                                <img src={item.image_url} className="w-20 h-20 rounded object-cover" />
                                <div className="flex-1">
                                    <h4 className="font-medium">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.type}</p>
                                    <p className="text-sm">₦{item.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full border hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full border hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-between text-lg font-medium mb-4">
                        <span>Total</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <Link
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="block w-full bg-black text-white py-3 rounded-full text-center font-medium hover:bg-gray-800 transition"
                    >
                        Proceed to checkout
                    </Link>
                </div>
            </motion.div>
        </>
    )
}