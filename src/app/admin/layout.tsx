"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getCurrentUser, isUserAdmin } from '@/lib/auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  
  // Check if the current path is the login page
  const isLoginPage = pathname === '/admin/login'
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        
        // Redirect to login if not authenticated or not admin
        if (!currentUser || !isUserAdmin(currentUser)) {
          if (!isLoginPage) {
            router.push('/admin/login')
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router, isLoginPage])
  
  // Skip auth check for login page
  if (isLoginPage) {
    return <>{children}</>
  }
  
  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-highlight-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  // Return children directly since layout is handled globally
  return <>{children}</>
} 