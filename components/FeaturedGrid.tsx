// components/FeaturedGrid.tsx
'use client'

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

export default function FeaturedGrid({ artworks }: { artworks: Artwork[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {artworks.map((artwork, index) => (
                <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                >
                    <Link href={`/gallery/${artwork.id}`}>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={artwork.image_url}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-lg">{artwork.title}</h3>
                                <p className="text-sm text-gray-500 capitalize">{artwork.category}</p>
                                {artwork.price && (
                                    <p className="mt-2 font-serif text-lg">₦{artwork.price?.toLocaleString()}</p>
                                )}
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}