import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_EMAILS } from './lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Skip middleware for non-admin paths
  if (!path.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  // Skip for login page
  if (path === '/admin/login') {
    return NextResponse.next()
  }
  
  // Get the session token from the cookies
  const session = request.cookies.get('session')?.value
  
  if (!session) {
    // Redirect to login page if no session
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  try {
    // Simple session check - you may want to implement a more secure solution
    const userEmail = request.cookies.get('userEmail')?.value
    
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      console.log('User not in admin list:', userEmail);
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    return NextResponse.next()
  } catch (error) {
    console.error('Error checking auth:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}