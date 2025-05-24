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
    // Here we would verify the session token
    // This is a simplified version, you'll need to implement proper token verification
    // For now, we'll just check if a session exists
    
    // In a real implementation, you'd verify the session with Firebase Admin SDK
    // And check if the user's email is in the ADMIN_EMAILS list
    
    return NextResponse.next()
  } catch (error) {
    console.error('Error verifying auth token:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
} 