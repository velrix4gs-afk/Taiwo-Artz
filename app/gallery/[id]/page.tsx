// app/gallery/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ArtworkDetail from '@/components/ArtworkDetail'

export const revalidate = 3600

type Params = Promise<{ id: string }>

export default async function ArtworkPage({ params }: { params: Params }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: artwork } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single()

    if (!artwork) {
        notFound()
    }

    return <ArtworkDetail artwork={artwork} />
}