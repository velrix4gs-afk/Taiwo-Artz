// components/AdminNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/artworks', label: 'Artworks' },
    { href: '/admin/commissions', label: 'Commissions' },
    { href: '/admin/orders', label: 'Orders' },
]

export default function AdminNav() {
    const pathname = usePathname()
    return (
        <nav className="w-64 bg-white border-r p-6">
            <h2 className="text-xl font-serif font-bold mb-6">Admin</h2>
            <ul className="space-y-2">
                {links.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`block px-4 py-2 rounded-lg ${pathname === link.href ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}