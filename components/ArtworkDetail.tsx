// components/ArtworkDetail.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Artwork = {
    id: string
    title: string
    description: string | null
    category: string | null
    price: number | null
    image_url: string
    is_print_available: boolean | null
    print_price: number | null
}

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
    const [selectedOption, setSelectedOption] = useState<'original' | 'print' | null>(null)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
        >
            <Link
                href="/gallery"
                className="inline-flex items-center text-gray-500 hover:text-black mb-6"
            >
                ← Back to gallery
            </Link>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Details */}
                <div>
                    <span className="text-sm uppercase tracking-wider text-gray-500">
                        {artwork.category}
                    </span>
                    <h1 className="text-4xl font-serif font-bold mt-2 mb-4">{artwork.title}</h1>
                    <p className="text-gray-600 leading-relaxed mb-6">{artwork.description}</p>

                    {artwork.price && (
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 mb-2">Original artwork</p>
                            <p className="text-3xl font-serif">₦{artwork.price?.toLocaleString()}</p>
                        </div>
                    )}

                    {artwork.is_print_available && artwork.print_price && (
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 mb-2">Limited edition print</p>
                            <p className="text-2xl font-serif mb-3">₦{artwork.print_price?.toLocaleString()}</p>
                            <button
                                onClick={() => setSelectedOption('print')}
                                className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                            >
                                Add print to cart
                            </button>
                        </div>
                    )}

                    <div className="border-t pt-6 mt-6">
                        <p className="text-sm text-gray-500">
                            Interested in this piece?{' '}
                            <Link href="/commission" className="underline hover:text-black">
                                Inquire about custom commission
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}