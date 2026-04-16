// app/admin/commissions/page.tsx
import { createClient } from '@/lib/supabase/server'
import CommissionList from '@/components/CommissionList'

export default async function AdminCommissionsPage() {
    const supabase = await createClient()
    const { data: commissions } = await supabase.from('commissions').select('*').order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-6">Commission Requests</h1>
            <CommissionList commissions={commissions || []} />
        </div>
    )
}