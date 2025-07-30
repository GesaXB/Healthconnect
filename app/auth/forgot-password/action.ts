'use server'

import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResetEmail(formData: FormData) {
  const email = formData.get('email') as string
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) return

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30) // 30 menit

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt
    }
  })

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${token}`

  await resend.emails.send({
    from: 'HealthConnect <onboarding@resend.dev>',
    to: user.email,
    subject: 'Reset Password Akun Anda',
    html: `
      <p>Halo ${user.name},</p>
      <p>Klik link berikut untuk mereset password akun kamu:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p><i>Link ini berlaku selama 30 menit.</i></p>
    `
  })
}
