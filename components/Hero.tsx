// components/Hero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-sm uppercase tracking-widest text-gray-500">
                    visual artist
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-bold mt-3 leading-tight">
                    Where light <br /> meets canvas.
                </h1>
                <p className="text-lg text-gray-600 mt-5 max-w-lg">
                    Original paintings, limited prints, and custom commissions. Bring your walls to life.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                    <Link
                        href="/gallery"
                        className="bg-black text-white px-7 py-3 rounded-full hover:scale-105 transition text-sm font-medium"
                    >
                        Explore gallery
                    </Link>
                    <Link
                        href="/commission"
                        className="border border-black px-7 py-3 rounded-full hover:bg-black hover:text-white transition text-sm font-medium"
                    >
                        Request commission
                    </Link>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <img
                    src="https://picsum.photos/id/1043/800/900"
                    alt="Artist studio"
                    className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg hidden md:block">
                    <p className="text-sm font-medium">✨ 50+ originals</p>
                </div>
            </motion.div>
        </div>
    )
}