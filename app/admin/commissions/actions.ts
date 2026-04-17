// app/admin/commissions/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCommissionStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('commissions').update({ status }).eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/admin/commissions')
    return { success: true }
}