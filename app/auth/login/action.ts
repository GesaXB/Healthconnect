'use server'

import { createToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('User not found')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Password salah')

  const token = createToken({ id: user.id, role: user.role })

  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true })

  switch (user.role) {
    case 'pasien':
      redirect('/dashboard/pasien')
      break
    case 'dokter':
      redirect('/dashboard/dokter')
      break
    case 'admin':
      redirect('/dashboard/admin')
      break
  }
}
