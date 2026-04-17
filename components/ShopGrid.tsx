// components/ShopGrid.tsx
'use client'

import { useCart } from '@/context/CartContext'
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

export default function ShopGrid({ artworks }: { artworks: Artwork[] }) {
    const { addToCart } = useCart()

    const handleAddPrint = async (artwork: Artwork) => {
        if (!artwork.print_price) return
        await addToCart({
            title: `${artwork.title} (Print)`,
            price: artwork.print_price,
            image_url: artwork.image_url,
            type: 'print',
            artwork_id: artwork.id
        })
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {artworks.map((artwork, index) => (
                <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
                >
                    <img
                        src={artwork.image_url}
                        className="w-full h-60 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-medium">{artwork.title} · print</h3>
                    <p className="text-sm text-gray-500 mb-1">Fine art giclée</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-serif">₦{artwork.print_price?.toLocaleString()}</span>
                        <button
                            onClick={() => handleAddPrint(artwork)}
                            className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                        >
                            Add to cart
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}