// app/admin/artworks/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addArtwork(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const price = parseFloat(formData.get('price') as string) || null
    const image_url = formData.get('image_url') as string
    const is_print_available = formData.get('is_print_available') === 'on'
    const print_price = parseFloat(formData.get('print_price') as string) || null

    const { error } = await supabase.from('artworks').insert({
        title, description, category, price, image_url, is_print_available, print_price
    })

    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/artworks')
    revalidatePath('/gallery')
    revalidatePath('/')
    return { success: true }
}

export async function deleteArtwork(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('artworks').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/artworks')
    revalidatePath('/gallery')
    revalidatePath('/')
    return { success: true }
}

export async function updateArtwork(id: string, formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const price = parseFloat(formData.get('price') as string) || null
    const image_url = formData.get('image_url') as string
    const is_print_available = formData.get('is_print_available') === 'on'
    const print_price = parseFloat(formData.get('print_price') as string) || null

    const { error } = await supabase.from('artworks').update({
        title, description, category, price, image_url, is_print_available, print_price
    }).eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/artworks')
    revalidatePath('/gallery')
    revalidatePath('/')
    return { success: true }
}