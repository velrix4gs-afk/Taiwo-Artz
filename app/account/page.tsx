// app/account/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AccountTabs from '@/components/AccountTabs'

export default async function AccountPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user's commissions
    const { data: commissions } = await supabase
        .from('commissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    // Fetch user's orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold mb-6">My Account</h1>
            <AccountTabs
                user={user}
                commissions={commissions || []}
                orders={orders || []}
            />
        </div>
    )
}