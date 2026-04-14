'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()
    const { totalItems, setIsCartOpen } = useCart()

    // ... existing auth code ...

    return (
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-serif font-bold">Arteon</Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {/* nav items */}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-xl hover:text-black/70"
                    >
                        🛒
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                    {/* user auth stuff */}
                </div>
            </div>
        </nav>
    )
}