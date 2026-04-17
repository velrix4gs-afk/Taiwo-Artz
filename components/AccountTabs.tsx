// components/AccountTabs.tsx
'use client'

import { User } from '@supabase/supabase-js'
import { useState } from 'react'

type Commission = {
    id: string
    description: string
    status: string
    budget: string | null
    timeline: string | null
    created_at: string
}

type Order = {
    id: string
    amount_total: number
    status: string
    created_at: string
}

export default function AccountTabs({
    user,
    commissions,
    orders
}: {
    user: User
    commissions: Commission[]
    orders: Order[]
}) {
    const [activeTab, setActiveTab] = useState<'commissions' | 'orders' | 'profile'>('commissions')

    const statusColors: Record<string, string> = {
        pending: 'text-yellow-600 bg-yellow-50',
        accepted: 'text-blue-600 bg-blue-50',
        in_progress: 'text-purple-600 bg-purple-50',
        completed: 'text-green-600 bg-green-50',
        declined: 'text-red-600 bg-red-50',
    }

    return (
        <div>
            {/* Tabs */}
            <div className="border-b mb-6">
                <nav className="flex gap-6">
                    {['commissions', 'orders', 'profile'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-3 px-2 text-sm font-medium capitalize ${activeTab === tab
                                    ? 'border-b-2 border-black text-black'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                {activeTab === 'commissions' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-medium mb-4">Commission Requests</h2>
                        {commissions.length === 0 ? (
                            <p className="text-gray-500">No commission requests yet.</p>
                        ) : (
                            commissions.map(comm => (
                                <div key={comm.id} className="border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500">{new Date(comm.created_at).toLocaleDateString()}</p>
                                            <p className="mt-2">{comm.description}</p>
                                            {comm.budget && <p className="text-sm mt-1">Budget: {comm.budget}</p>}
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[comm.status]}`}>
                                            {comm.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-medium mb-4">Order History</h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-500">No orders yet.</p>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="border-b pb-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                            <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">₦{order.amount_total?.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div>
                        <h2 className="text-xl font-medium mb-4">Profile Information</h2>
                        <div className="space-y-3">
                            <p><span className="text-gray-500">Email:</span> {user.email}</p>
                            <p><span className="text-gray-500">User ID:</span> {user.id}</p>
                            <p><span className="text-gray-500">Last sign in:</span> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}