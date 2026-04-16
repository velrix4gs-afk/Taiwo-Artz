// app/admin/artworks/page.tsx
import { createClient } from '@/lib/supabase/server'
import ArtworkList from '@/components/ArtworkList'
import AddArtworkForm from '@/components/AddArtworkForm'

export default async function AdminArtworksPage() {
    const supabase = await createClient()
    const { data: artworks } = await supabase.from('artworks').select('*').order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-6">Manage Artworks</h1>
            <AddArtworkForm />
            <ArtworkList artworks={artworks || []} />
        </div>
    )
}