// app/checkout/page.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Script from 'next/script'

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handlePaystackPayment = () => {
        if (!email) {
            alert('Please enter your email')
            return
        }
        setLoading(true)

        const handler = (window as any).PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email: email,
            amount: totalPrice * 100, // Convert Naira to kobo (Paystack expects kobo for NGN)
            currency: 'NGN', // Change from USD to NGN
            ref: `ART-${Date.now()}`,
            callback: (response: any) => {
                console.log('Payment successful:', response)
                clearCart()
                router.push('/checkout/success')
            },
            onClose: () => {
                setLoading(false)
                alert('Payment window closed')
            }
        })
    }

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl mb-4">Your cart is empty</h2>
                <button onClick={() => router.push('/shop')} className="bg-black text-white px-6 py-3 rounded-full">
                    Continue shopping
                </button>
            </div>
        )
    }

    return (
        <>
            <Script src="https://js.paystack.co/v1/inline.js" />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

                <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                    <h2 className="font-medium mb-4">Order summary</h2>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between py-2 border-b">
                            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                    <label className="block mb-2 font-medium">Email for receipt</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border rounded-xl p-3 mb-6"
                        required
                    />

                    <button
                        onClick={handlePaystackPayment}
                        disabled={loading}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-full font-medium transition"
                    >
                        {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)} with Paystack`}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                        Secure payment via Paystack · Test mode
                    </p>
                </div>
            </div>
        </>
    )
}