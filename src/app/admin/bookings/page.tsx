"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBookingsByStatus } from '@/lib/firebase/services'
import { Booking } from '@/types/booking'
import { 
  CalendarClock, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  ChevronRight
} from 'lucide-react'

const BookingItem = ({ booking }: { booking: Booking }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 text-green-600 border-green-200'
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200'
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-200'
      default: return 'bg-stone-50 text-stone-600 border-stone-200'
    }
  }
  
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 hover:shadow-subtle transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-highlight-primary/10 flex items-center justify-center">
            <CalendarClock size={20} className="text-highlight-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-stone-900">{booking.customerInfo.name}</h3>
            <p className="text-sm text-stone-500">Ref: {booking.reference}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-stone-500 mb-1">Date</p>
          <p className="font-medium text-stone-800">{formatDate(booking.date)}</p>
        </div>
        <div>
          <p className="text-xs text-stone-500 mb-1">Guests</p>
          <p className="font-medium text-stone-800">{booking.guests.adults + booking.guests.children}</p>
        </div>
        <div>
          <p className="text-xs text-stone-500 mb-1">Amount</p>
          <p className="font-medium text-stone-800">${booking.paymentDetails.totalAmount}</p>
        </div>
        <div>
          <p className="text-xs text-stone-500 mb-1">Contact</p>
          <p className="font-medium text-stone-800">{booking.customerInfo.email}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <p className="text-sm text-stone-600">
          {booking.activities.length > 0 ? booking.activities[0].name : 'No activity selected'}
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
            <Eye size={16} className="text-stone-600" />
          </button>
          <button className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
            <Edit size={16} className="text-stone-600" />
          </button>
          <button className="p-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const fetchBookings = async () => {
    try {
      setLoading(true)
      // Fetch bookings for all statuses since there's no 'all' option
      const [confirmedBookings, pendingBookings, cancelledBookings] = await Promise.all([
        getBookingsByStatus('confirmed'),
        getBookingsByStatus('pending'),
        getBookingsByStatus('cancelled')
      ])
      
      const allBookings = [...confirmedBookings, ...pendingBookings, ...cancelledBookings]
      setBookings(allBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchBookings()
  }, [])
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Bookings</h1>
          <p className="text-stone-500 mt-2">Manage all tour bookings</p>
        </div>
        <Link 
          href="/admin/bookings/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-primary text-white rounded-xl hover:bg-highlight-primary/90 transition-colors"
        >
          <Plus size={20} />
          New Booking
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-stone-900">{bookings.length}</div>
          <div className="text-sm text-stone-500">Total Bookings</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="text-sm text-stone-500">Confirmed</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-amber-600">
            {bookings.filter(b => b.status === 'pending').length}
          </div>
          <div className="text-sm text-stone-500">Pending</div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="text-2xl font-bold text-red-600">
            {bookings.filter(b => b.status === 'cancelled').length}
          </div>
          <div className="text-sm text-stone-500">Cancelled</div>
        </div>
      </div>
      
      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-highlight-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingItem key={booking.reference} booking={booking} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
              <CalendarClock size={48} className="mx-auto text-stone-300 mb-4" />
              <h3 className="text-lg font-medium text-stone-900 mb-2">No bookings found</h3>
              <p className="text-stone-500 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by creating your first booking'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link 
                  href="/admin/bookings/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-highlight-primary text-white rounded-xl hover:bg-highlight-primary/90 transition-colors"
                >
                  <Plus size={20} />
                  Create Booking
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 