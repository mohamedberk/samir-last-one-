"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCurrentUser, isUserAdmin, signOut } from '@/lib/auth'
import { 
  LayoutDashboard, 
  CalendarRange, 
  Users, 
  List, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileText
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function AdminSidebar({ isOpen = true, onClose, isMobile = false }: AdminSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Auth check error:', error)
      }
    }
    
    checkAuth()
  }, [])
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  // Navigation items
  const navItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      href: '/admin',
      active: pathname === '/admin' || pathname === '/admin/dashboard'
    },
    { 
      icon: <CalendarRange size={20} />, 
      label: 'Bookings', 
      href: '/admin/bookings',
      active: pathname.startsWith('/admin/bookings')
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Blogs', 
      href: '/admin/blogs',
      active: pathname.startsWith('/admin/blogs')
    }
  ]

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside 
          className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-stone-200 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Mobile header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image 
                    src="/logo.png" 
                    alt="Admin Panel" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-semibold text-stone-900">Admin Panel</span>
              </Link>
              <button 
                className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
                onClick={onClose}
              >
                <X size={20} className="text-stone-600" />
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      item.active
                        ? 'bg-highlight-primary text-white shadow-lg'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                    onClick={onClose}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
            
            {/* Sign out */}
            <div className="p-6 border-t border-stone-200">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-stone-50 hover:text-stone-900 w-full transition-all duration-200"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>
      </>
    )
  }

  // Desktop sidebar
  return (
    <aside className="w-64 h-screen bg-white border-r border-stone-200 flex flex-col sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-stone-200">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Admin Panel" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-stone-900">Admin Panel</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-highlight-primary text-white shadow-lg'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* User section */}
      <div className="p-6 border-t border-stone-200">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-stone-50 hover:text-stone-900 w-full transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
} 