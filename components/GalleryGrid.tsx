// components/GalleryGrid.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function GalleryGrid({
    artworks,
    categories
}: {
    artworks: Artwork[]
    categories: string[]
}) {
    const [filter, setFilter] = useState('all')

    const filteredArtworks = filter === 'all'
        ? artworks
        : artworks.filter(a => a.category === filter)

    return (
        <>
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Gallery grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredArtworks.map((artwork) => (
                        <motion.div
                            key={artwork.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/gallery/${artwork.id}`}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={artwork.image_url}
                                            alt={artwork.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {artwork.category && (
                                            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                                {artwork.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-xl font-medium">{artwork.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{artwork.description}</p>
                                        {artwork.price && (
                                            <p className="mt-3 font-serif text-lg">₦{artwork.price?.toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredArtworks.length === 0 && (
                <p className="text-center text-gray-500 py-12">No artworks in this category yet.</p>
            )}
        </>
    )
}