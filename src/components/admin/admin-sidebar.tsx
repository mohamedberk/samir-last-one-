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
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
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
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-stone-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="VIP Marrakech Trips" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-stone-900">Admin Panel</span>
            </Link>
            <button 
              className="md:hidden text-stone-500 hover:text-stone-700"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      item.active
                        ? 'bg-highlight-primary text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                    onClick={onClose}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User info and sign out */}
          <div className="p-4 border-t border-stone-200">
            
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 w-full"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
} 