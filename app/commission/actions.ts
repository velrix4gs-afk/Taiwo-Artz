// app/commission/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function submitCommission(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const description = formData.get('description') as string
    const budget = formData.get('budget') as string
    const timeline = formData.get('timeline') as string

    if (!name || !email || !description) {
        return { success: false, error: 'Name, email and description are required' }
    }

    const supabase = await createClient()

    // Insert into Supabase
    const { error: dbError } = await supabase
        .from('commissions')
        .insert({
            full_name: name,
            email,
            description,
            budget: budget || null,
            timeline: timeline || null,
            status: 'pending'
        })

    if (dbError) {
        console.error('DB error:', dbError)
        return { success: false, error: 'Failed to save request' }
    }

    // Send email notification to artist
    try {
        await resend.emails.send({
            from: 'Arteon Commissions <onboarding@resend.dev>',
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
      `
        })
    } catch (emailError) {
        console.error('Email failed:', emailError)
        // Still return success even if email fails
    }

    return { success: true }
}