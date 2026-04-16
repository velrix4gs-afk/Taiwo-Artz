// app/admin/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
    const supabase = await createClient()

    const { count: artworksCount } = await supabase.from('artworks').select('*', { count: 'exact', head: true })
    const { count: commissionsCount } = await supabase.from('commissions').select('*', { count: 'exact', head: true })
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">Artworks</p>
                    <p className="text-4xl font-bold">{artworksCount ?? 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">Commissions</p>
                    <p className="text-4xl font-bold">{commissionsCount ?? 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-500">Orders</p>
                    <p className="text-4xl font-bold">{ordersCount ?? 0}</p>
                </div>
            </div>
        </div>
    )
}