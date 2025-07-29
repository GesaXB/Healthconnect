import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

type AuthPayload = {
  id: string
  role: string
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (token) {
    const payload = verifyToken(token) as AuthPayload

    if (
      payload &&
      typeof payload === 'object' &&
      'role' in payload &&
      typeof payload.role === 'string'
    ) {
      const role = payload.role

      if (!url.pathname.includes(role)) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url))
      }
    }
  }

  return NextResponse.next()
}
