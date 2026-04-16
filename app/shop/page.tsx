// app/shop/page.tsx
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Shop Prints | Arteon',
    description: 'Limited edition fine art prints. Archival quality, ready to frame.',
}
import { createClient } from '@/lib/supabase/server'
import ShopGrid from '@/components/ShopGrid'

export const revalidate = 3600

export default async function ShopPage() {
    const supabase = await createClient()

    const { data: artworks } = await supabase
        .from('artworks')
        .select('*')
        .eq('is_print_available', true)
        .order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Shop prints</h1>
            <p className="text-gray-500 mb-8">Archival quality, ready to frame</p>

            <ShopGrid artworks={artworks || []} />
        </div>
    )
}
