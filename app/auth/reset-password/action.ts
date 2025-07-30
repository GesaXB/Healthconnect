'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function resetPassword(formData: FormData) {
  const token = formData.get('token') as string
  const password = formData.get('password') as string

  const tokenEntry = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
    return { error: 'Token tidak valid atau kadaluarsa' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: tokenEntry.userId },
    data: { password: hashedPassword }
  })

  await prisma.passwordResetToken.delete({
    where: { id: tokenEntry.id }
  })

  return { success: true }
}
