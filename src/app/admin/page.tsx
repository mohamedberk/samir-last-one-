"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'
import { getBookingsByStatus } from '@/lib/firebase/services'
import { Booking } from '@/types/booking'
import { 
  CalendarClock, 
  ArrowUpRight, 
  Users, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock, 
  ChevronRight,
  TrendingUp,
  UserCheck,
  List
} from 'lucide-react'

// Dashboard Stats Card component
const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  linkHref, 
  linkText 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode
  change?: { value: string; positive: boolean }
  linkHref?: string
  linkText?: string
}) => (
  <div className="bg-white rounded-premium shadow-subtle border border-stone-200 p-6 hover:shadow-subtle-hover transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-full bg-highlight-primary/10 flex items-center justify-center">
        {icon}
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
          change.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {change.positive ? '+' : ''}{change.value}
        </div>
      )}
    </div>
    
    <h3 className="text-stone-500 text-sm font-medium mb-1">{title}</h3>
    <div className="text-3xl font-semibold text-stone-900 mb-4">{value}</div>
    
    {linkHref && (
      <Link 
        href={linkHref} 
        className="inline-flex items-center gap-1 text-sm font-medium text-highlight-primary hover:underline"
      >
        {linkText || 'View details'}
        <ChevronRight size={16} />
      </Link>
    )}
  </div>
)

// Recent Booking Item component
const RecentBookingItem = ({ booking }: { booking: Booking }) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }
  
  return (
    <Link 
      href={`/admin/bookings/${booking.reference}`} 
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-stone-200 hover:border-highlight-primary/30 hover:bg-stone-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
          <CalendarClock size={18} className="text-highlight-primary" />
        </div>
        <div>
          <div className="font-medium text-stone-900">
            {booking.customerInfo.name}
          </div>
          <div className="text-sm text-stone-500">
            Ref: {booking.reference}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex flex-col items-end">
          <span className="text-stone-500">Date</span>
          <span className="font-medium text-stone-800">{formatDate(booking.date)}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-stone-500">Amount</span>
          <span className="font-medium text-stone-800">${booking.paymentDetails.totalAmount}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-stone-500">Status</span>
          <span className={`font-medium ${
            booking.status === 'confirmed' ? 'text-green-600' : 
            booking.status === 'pending' ? 'text-amber-600' : 
            booking.status === 'cancelled' ? 'text-red-600' : 'text-stone-800'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        
        <div className="ml-2">
          <ChevronRight size={18} className="text-stone-400" />
        </div>
      </div>
    </Link>
  )
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    newCustomers: 0,
    monthlyRevenue: 0
  })
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Get recent bookings
      const confirmedBookings = await getBookingsByStatus('confirmed')
      setRecentBookings(confirmedBookings.slice(0, 5))
      
      // Calculate stats
      const today = new Date()
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      
      // Get all bookings
      if (!db) {
        console.error('Firestore is not initialized');
        setLoading(false);
        return;
      }
      
      const bookingsRef = collection(db, 'bookings')
      const bookingsSnapshot = await getDocs(bookingsRef)
      const totalBookings = bookingsSnapshot.size
      
      // Get upcoming bookings (filter client-side to avoid index requirement)
      const upcomingBookingsQuery = query(
        bookingsRef,
        where('status', '==', 'confirmed')
      )
      const upcomingBookingsSnapshot = await getDocs(upcomingBookingsQuery)
      let upcomingBookings = 0
      upcomingBookingsSnapshot.forEach(doc => {
        const booking = doc.data()
        if (booking.date && booking.date.toDate() >= today) {
          upcomingBookings++
        }
      })
      
      // Calculate monthly revenue (filter client-side to avoid index requirement)
      let monthlyRevenue = 0
      const monthlyBookingsQuery = query(
        bookingsRef,
        where('status', '==', 'confirmed')
      )
      const monthlyBookingsSnapshot = await getDocs(monthlyBookingsQuery)
      
      const customersThisMonth = new Set()
      monthlyBookingsSnapshot.forEach(doc => {
        const booking = doc.data()
        const bookingDate = booking.date?.toDate()
        
        if (bookingDate && bookingDate >= firstDayOfMonth) {
          if (booking.paymentDetails?.totalAmount) {
            monthlyRevenue += parseFloat(booking.paymentDetails.totalAmount)
          }
          
          if (booking.customerInfo?.email) {
            customersThisMonth.add(booking.customerInfo.email)
          }
        }
      })
      
      setStats({
        totalBookings,
        upcomingBookings,
        newCustomers: customersThisMonth.size,
        monthlyRevenue
      })
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchDashboardData()
  }, [])
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 mt-2">Welcome to your admin dashboard</p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-highlight-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              icon={<Calendar size={24} className="text-highlight-primary" />}
              change={{ value: '12%', positive: true }}
              linkHref="/admin/bookings"
              linkText="View all bookings"
            />
            
            <StatCard
              title="Upcoming Tours"
              value={stats.upcomingBookings}
              icon={<Clock size={24} className="text-highlight-primary" />}
              linkHref="/admin/bookings?status=upcoming"
              linkText="View schedule"
            />
            
            <StatCard
              title="Monthly Revenue"
              value={`$${stats.monthlyRevenue.toFixed(2)}`}
              icon={<DollarSign size={24} className="text-highlight-primary" />}
              change={{ value: '8.3%', positive: true }}
              linkHref="/admin/bookings"
            />
            
            <StatCard
              title="New Customers"
              value={stats.newCustomers}
              icon={<UserCheck size={24} className="text-highlight-primary" />}
              change={{ value: '4%', positive: true }}
              linkHref="/admin/customers"
            />
          </div>
          
          {/* Recent Bookings */}
          <div className="bg-white rounded-premium border border-stone-200 shadow-subtle p-6 mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-stone-900">Recent Bookings</h2>
              <Link 
                href="/admin/bookings" 
                className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full text-highlight-primary border border-highlight-primary/20 hover:bg-highlight-primary/5 transition-colors"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <RecentBookingItem key={booking.reference} booking={booking} />
                ))
              ) : (
                <div className="text-center py-8 text-stone-500">
                  No bookings found
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-premium border border-stone-200 shadow-subtle p-6">
            <h2 className="text-xl font-semibold text-stone-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/admin/bookings/new"
                className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-highlight-primary/30 hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-highlight-primary" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Create Booking</div>
                  <div className="text-sm text-stone-500">Add a new booking</div>
                </div>
              </Link>
              
              <Link
                href="/admin/activities/new"
                className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-highlight-primary/30 hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
                  <List size={18} className="text-highlight-primary" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Add Activity</div>
                  <div className="text-sm text-stone-500">Create new experience</div>
                </div>
              </Link>
              
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 hover:border-highlight-primary/30 hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-highlight-primary" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Manage Customers</div>
                  <div className="text-sm text-stone-500">View customer database</div>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 