// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Define which routes should be protected
const protectedRoutes = ['/dashboard', '/chat']
const authRoutes = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const path = request.nextUrl.pathname

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isAuthRoute = authRoutes.some(route => path === route)

  // If no token and trying to access protected route, redirect to login
  if (!token && isProtectedRoute) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If token exists and trying to access auth routes, redirect to dashboard
  if (token && isAuthRoute) {
    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      await jwtVerify(token, secret)

      // If token is valid, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (error) {
      // If token is invalid, clear cookie and continue to auth page
      const response = NextResponse.next()
      response.cookies.delete('auth-token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/chat/:path*', '/login', '/signup']
}
