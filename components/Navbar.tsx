// components/Navbar.tsx
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

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
        }
        getUser()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => listener?.subscription.unsubscribe()
    }, [supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Shop', href: '/shop' },
        { name: 'Commission', href: '/commission' },
    ]

    return (
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-serif font-bold">
                    Arteon
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`hover:text-black/70 transition ${pathname === item.href ? 'text-black font-semibold' : 'text-gray-600'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right side: Cart + Auth */}
                <div className="flex items-center gap-4">
                    {/* Cart Button */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-xl hover:text-black/70 transition"
                        aria-label="Open cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Auth Section */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/account"
                                className="text-sm text-gray-700 hover:text-black hover:underline transition"
                            >
                                My Account
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="text-sm text-gray-500 hover:text-black hover:underline transition"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-medium text-gray-700 hover:text-black hover:underline transition"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}