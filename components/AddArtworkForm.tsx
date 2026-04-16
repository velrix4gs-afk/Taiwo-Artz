// components/AddArtworkForm.tsx
'use client'

import { useState } from 'react'
import { addArtwork } from '@/app/admin/artworks/actions'

export default function AddArtworkForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await addArtwork(formData)
        setLoading(false)
        if (result.success) {
            setMessage('Artwork added successfully!')
            const form = document.getElementById('add-artwork-form') as HTMLFormElement
            form?.reset()
        } else {
            setMessage(result.error || 'Failed to add artwork')
        }
    }

    return (
        <form id="add-artwork-form" action={handleSubmit} className="bg-white p-6 rounded-xl mb-8 space-y-4">
            <h2 className="text-xl font-medium">Add New Artwork</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Title" required className="border p-3 rounded-lg" />
                <input name="description" placeholder="Description" className="border p-3 rounded-lg" />
                <select name="category" className="border p-3 rounded-lg">
                    <option value="painting">Painting</option>
                    <option value="drawing">Drawing</option>
                </select>
                <input name="price" type="number" step="0.01" placeholder="Price (₦)" className="border p-3 rounded-lg" />
                <input name="image_url" placeholder="Image URL" required className="border p-3 rounded-lg col-span-2" />
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="is_print_available" defaultChecked /> Print available?
                </label>
                <input name="print_price" type="number" step="0.01" placeholder="Print Price (₦)" className="border p-3 rounded-lg" />
            </div>
            <button type="submit" disabled={loading} className="bg-black text-white px-6 py-3 rounded-lg">
                {loading ? 'Adding...' : 'Add Artwork'}
            </button>
            {message && <p className="text-sm text-gray-600">{message}</p>}
        </form>
    )
}