// components/CommissionList.tsx
'use client'

import { updateCommissionStatus } from '@/app/admin/commissions/actions'
import { useRouter } from 'next/navigation'

type Commission = {
    id: string
    full_name: string
    email: string
    description: string
    budget: string | null
    timeline: string | null
    status: string
    created_at: string
}

export default function CommissionList({ commissions }: { commissions: Commission[] }) {
    const router = useRouter()

    async function handleStatusChange(id: string, status: string) {
        await updateCommissionStatus(id, status)
        router.refresh()
    }

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-purple-100 text-purple-800',
        completed: 'bg-green-100 text-green-800',
        declined: 'bg-red-100 text-red-800',
    }

    return (
        <div className="space-y-4">
            {commissions.length === 0 ? (
                <p className="text-gray-500">No commission requests yet.</p>
            ) : (
                commissions.map(comm => (
                    <div key={comm.id} className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-medium text-lg">{comm.full_name}</h3>
                                <p className="text-sm text-gray-500">{comm.email}</p>
                            </div>
                            <select
                                value={comm.status}
                                onChange={(e) => handleStatusChange(comm.id, e.target.value)}
                                className={`text-sm px-3 py-1 rounded-full border-0 ${statusColors[comm.status]}`}
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>
                        <p className="text-gray-700 mb-3">{comm.description}</p>
                        <div className="flex gap-6 text-sm text-gray-500">
                            <span>Budget: {comm.budget || 'Not specified'}</span>
                            <span>Timeline: {comm.timeline || 'Not specified'}</span>
                            <span>{new Date(comm.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}