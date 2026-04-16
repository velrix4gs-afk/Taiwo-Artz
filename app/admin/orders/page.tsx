// app/admin/orders/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function AdminOrdersPage() {
    const supabase = await createClient()
    const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold mb-6">Orders</h1>
            <div className="space-y-4">
                {orders?.length === 0 ? (
                    <p className="text-gray-500">No orders yet.</p>
                ) : (
                    orders?.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-xl">
                            <p>Order ID: {order.id}</p>
                            <p>Total: ₦{order.amount_total?.toLocaleString()}</p>
                            <p>Status: {order.status}</p>
                            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}