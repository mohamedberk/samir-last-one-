"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'
import { Menu } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Check if we're on an admin page (but not login)
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  
  if (!isAdminPage) {
    return <>{children}</>
  }
  
  return (
    <div className="min-h-screen bg-sand-50">
      <Toaster position="top-right" />
      
      {/* Desktop Layout */}
      <div className="flex h-screen">
        {/* Sticky Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
            <button 
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} className="text-stone-600" />
            </button>
            <h1 className="text-lg font-semibold text-stone-900">Admin Panel</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
          
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isMobile={true}
      />
    </div>
  )
} 