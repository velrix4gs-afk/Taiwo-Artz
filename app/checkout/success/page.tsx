// app/checkout/success/page.tsx
import Link from 'next/link'

export default function SuccessPage() {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-serif font-bold mb-4">Thank you! 🎉</h1>
            <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
            <Link href="/shop" className="bg-black text-white px-6 py-3 rounded-full inline-block">
                Continue shopping
            </Link>
        </div>
    )
}