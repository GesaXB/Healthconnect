'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

export async function registerUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (password.length < 8) {
    throw new Error('Password harus minimal 8 karakter.')
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Format email tidak valid.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'pasien'
      }
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      throw new Error('Unique constraint failed on the fields: (`email`)')
    }
    throw error
  }

  redirect('/auth/login')
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return !user
  } catch (error) {
    console.error('Error checking email availability:', error)
    return false
  }
}
