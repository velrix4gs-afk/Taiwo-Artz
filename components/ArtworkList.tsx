// components/ArtworkList.tsx
'use client'

import { deleteArtwork } from '@/app/admin/artworks/actions'
import { useRouter } from 'next/navigation'

type Artwork = { id: string; title: string; image_url: string; price: number | null }

export default function ArtworkList({ artworks }: { artworks: Artwork[] }) {
    const router = useRouter()

    async function handleDelete(id: string) {
        if (!confirm('Delete this artwork? This cannot be undone.')) return
        await deleteArtwork(id)
        router.refresh()
    }

    return (
        <div className="grid gap-4">
            {artworks.length === 0 ? (
                <p className="text-gray-500">No artworks yet. Add your first one above.</p>
            ) : (
                artworks.map(art => (
                    <div key={art.id} className="flex items-center gap-4 bg-white p-4 rounded-xl">
                        <img src={art.image_url} alt={art.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-medium">{art.title}</h3>
                            <p className="text-sm">₦{art.price?.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(art.id)}
                            className="text-red-500 hover:underline text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}