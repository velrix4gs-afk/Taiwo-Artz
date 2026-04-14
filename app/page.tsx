// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arteon – Contemporary Artist Portfolio',
  description: 'Original paintings, limited prints, and custom commissions. Contemporary art that brings walls to life.',
  openGraph: {
    title: 'Arteon – Contemporary Artist Portfolio',
    description: 'Original paintings, limited prints, and custom commissions.',
    images: ['/og-image.jpg'], // add an image to public/ folder
  },
}
import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/Hero'
import FeaturedGrid from '@/components/FeaturedGrid'

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  const supabase = await createClient()

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <>
      <Hero />
      <section className="mt-24">
        <h2 className="text-3xl font-serif font-semibold mb-8">Featured works</h2>
        <FeaturedGrid artworks={artworks || []} />
      </section>
    </>
  )
}