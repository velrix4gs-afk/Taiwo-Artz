// app/commission/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function submitCommission(formData: FormData) {
    const supabase = await createClient()

    // Get current user (if logged in)
    const { data: { user } } = await supabase.auth.getUser()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const description = formData.get('description') as string
    const budget = formData.get('budget') as string
    const timeline = formData.get('timeline') as string

    if (!name || !email || !description) {
        return { success: false, error: 'Name, email and description are required' }
    }

    // Insert commission into Supabase
    const { error: dbError } = await supabase
        .from('commissions')
        .insert({
            user_id: user?.id || null, // associate with logged-in user if exists
            full_name: name,
            email,
            description,
            budget: budget || null,
            timeline: timeline || null,
            status: 'pending'
        })

    if (dbError) {
        console.error('DB error:', dbError)
        return { success: false, error: 'Failed to save commission request' }
    }

    // Send email notification to artist (optional)
    try {
        await resend.emails.send({
            from: 'Arteon Commissions <onboarding@resend.dev>', // Replace with your verified domain
            to: 'velrix4gs@gmail.com', // ← REPLACE WITH YOUR REAL EMAIL
            subject: `New commission request from ${name}`,
            replyTo: email,
            html: `
        <h2>New Commission Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Description:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
        ${user ? `<p><strong>User ID:</strong> ${user.id}</p>` : '<p><em>Guest submission</em></p>'}
        <hr>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/commissions">View in admin dashboard</a></p>
      `
        })
    } catch (emailError) {
        console.error('Email failed to send:', emailError)
        // Still return success; email failure shouldn't block the submission
    }

    return { success: true }
}