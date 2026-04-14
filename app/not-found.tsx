import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="text-center py-24">
            <h1 className="text-6xl font-serif mb-4">404</h1>
            <p className="text-gray-500 mb-8">This page could not be found.</p>
            <Link href="/" className="text-black underline">Return home</Link>
        </div>
    )
}