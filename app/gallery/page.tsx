// app/gallery/page.tsx
// app/gallery/page.tsx
import { Metadata } from 'next'   // ← ADD THIS LINE
import { createClient } from '@/lib/supabase/server'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery | Arteon',   // Fixed typo from "Arteen" to "Arteon"
  description: 'Browse original artworks and studies. Paintings, drawings, and mixed media.',
}

export const revalidate = 3600

export default async function GalleryPage() {
  // ... rest of your code
}
export const metadata: Metadata = {
    title: 'Gallery | Arteon',
    description: 'Browse original artworks and studies. Paintings, drawings, and mixed media.',
}
import { createClient } from '@/lib/supabase/server'
import GalleryGrid from '@/components/GalleryGrid'

export const revalidate = 3600

export default async function GalleryPage() {
    const supabase = await createClient()

    const { data: artworks } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })

    // Get unique categories for filter buttons
    const categories = ['all', ...new Set(artworks?.map(a => a.category).filter(Boolean))]

    return (
        <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Gallery</h1>
            <p className="text-gray-500 mb-8">Original artworks & studies</p>

            <GalleryGrid artworks={artworks || []} categories={categories as string[]} />
        </div>
    )
}
