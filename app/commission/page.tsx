// app/commission/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { submitCommission } from './actions'

export default function CommissionPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError('')

        const result = await submitCommission(formData)

        setLoading(false)
        if (result.success) {
            setSuccess(true)
            setTimeout(() => router.push('/'), 3000)
        } else {
            setError(result.error || 'Something went wrong')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Commission a piece</h1>
            <p className="text-gray-600 mb-8">
                Tell me about your vision — I'll create something unique for you.
            </p>

            {success ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl">
                    <h2 className="text-xl font-medium mb-2">✨ Request sent!</h2>
                    <p>Thank you! I'll reply within 48 hours to discuss details.</p>
                </div>
            ) : (
                <form action={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Full name *
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full border rounded-xl p-3 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full border rounded-xl p-3 bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Describe your idea *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            required
                            className="w-full border rounded-xl p-3 bg-gray-50"
                            placeholder="Style, size, subject, medium, any references..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mt-5">
                        <div>
                            <label htmlFor="budget" className="block text-sm mb-1">
                                Budget range (₦)
                            </label>
                            <select id="budget" name="budget" className="w-full border rounded-xl p-3 bg-gray-50">
                                <option value="₦100,000 – ₦300,000">₦100,000 – ₦300,000</option>
                                <option value="₦300,000 – ₦600,000">₦300,000 – ₦600,000</option>
                                <option value="₦600,000+">₦600,000+</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="timeline" className="block text-sm mb-1">
                                Timeline
                            </label>
                            <select id="timeline" name="timeline" className="w-full border rounded-xl p-3 bg-gray-50">
                                <option value="Flexible">Flexible</option>
                                <option value="1-2 weeks">1–2 weeks</option>
                                <option value="3-4 weeks">3–4 weeks</option>
                                <option value="1-2 months">1–2 months</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Submit request'}
                        </button>
                        <p className="text-sm text-gray-400 mt-3">I'll reply within 48 hours</p>
                    </div>
                </form>
            )}
        </motion.div>
    )
}   