import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Commission | Arteon',
    description: 'Request a custom artwork. Tell me your vision, I will create something unique.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}   