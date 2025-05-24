"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'
import { Menu } from 'lucide-react'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Check if we're on an admin page (but not login)
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  
  if (!isAdminPage) {
    return <>{children}</>
  }
  
  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Admin Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-0">
        {/* Mobile header for menu button */}
        <div className="md:hidden bg-white border-b border-stone-200 p-4">
          <button 
            className="text-stone-500 hover:text-stone-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 