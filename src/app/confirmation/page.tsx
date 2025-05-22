"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  MapPin, 
  Phone,
  Shield, 
  Star, 
  ThumbsUp, 
  Ticket, 
  Users
} from 'lucide-react'
import { allActivities } from '@/data/activities'
import { Activity } from '@/types/activity'
import { Booking } from '@/types/booking'
import { getBooking } from '@/lib/firebase/services'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [booking, setBooking] = useState<Partial<Booking> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef<HTMLDivElement>(null)

  // Parse booking data from URL or fetch from Firestore
  useEffect(() => {
    async function fetchBookingData() {
      try {
        // Check if there's a reference parameter which means we need to fetch from Firestore
        const reference = searchParams.get('reference')
        const bookingParam = searchParams.get('booking')

        if (reference) {
          // Fetch booking from Firestore
          setLoading(true)
          
          try {
            const bookingData = await getBooking(reference)
            
            if (bookingData) {
              setBooking(bookingData)
              
              // Find the activity
              if (bookingData.activities && bookingData.activities[0]) {
                const foundActivity = allActivities.find(a => a.id === bookingData.activities[0].id)
                if (foundActivity) {
                  setActivity(foundActivity)
                  // Show confetti animation
                  setShowConfetti(true)
                } else {
                  console.error('Activity not found in data')
                  // Set generic error
                  setError('Unable to load activity details. Please contact support.')
                }
              }
            } else {
              // If booking wasn't found in Firestore, try to use URL parameters as fallback
              if (bookingParam) {
                handleUrlParamBooking(bookingParam)
              } else {
                setError('Booking not found. Please check your booking reference.')
                console.error('Booking not found in Firestore')
              }
            }
          } catch (fetchError) {
            console.error('Error fetching from Firestore:', fetchError)
            
            // Attempt to use URL parameter as fallback if available
            if (bookingParam) {
              handleUrlParamBooking(bookingParam)
            } else {
              setError('There was an error retrieving your booking. Please try again.')
            }
          } finally {
            setLoading(false)
          }
        } else if (bookingParam) {
          handleUrlParamBooking(bookingParam)
        } else {
          setError('No booking reference provided.')
          setLoading(false)
        }
      } catch (error) {
        console.error('Error in fetchBookingData:', error)
        setError('There was an error retrieving your booking. Please try again.')
        setLoading(false)
      }
    }
    
    // Helper function to handle booking from URL parameter
    function handleUrlParamBooking(bookingParam: string) {
      try {
        // Parse booking from URL parameter (for backward compatibility)
        const parsedBooking = JSON.parse(decodeURIComponent(bookingParam))
        setBooking(parsedBooking)
        
        // Find the activity
        if (parsedBooking.activities && parsedBooking.activities[0]) {
          const foundActivity = allActivities.find(a => a.id === parsedBooking.activities[0].id)
          if (foundActivity) {
            setActivity(foundActivity)
            // Show confetti animation
            setShowConfetti(true)
          }
        }
        setLoading(false)
      } catch (parseError) {
        console.error('Error parsing booking from URL:', parseError)
        setError('There was an error with your booking data. Please try again.')
        setLoading(false)
      }
    }
    
    fetchBookingData()
  }, [searchParams])

  // Format date
  const formatDate = (date: Date | any) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  // Generate booking reference
  const generateBookingReference = () => {
    return `MRT-${Math.floor(100000 + Math.random() * 900000)}`
  }

  const bookingReference = booking?.reference || generateBookingReference()
  
  // Function to generate and download receipt
  const downloadReceipt = () => {
    if (!booking || !activity) return;

    // Format the receipt content
    const receiptContent = `
VIP MARRAKECH TRIPS
BOOKING CONFIRMATION

Booking Reference: ${bookingReference}
Date: ${formatDate(booking.date)}

Customer Information:
Name: ${booking.customerInfo?.name}
Email: ${booking.customerInfo?.email}
Phone: ${booking.customerInfo?.phone}
Nationality: ${booking.customerInfo?.nationality}
Pickup Location: ${booking.customerInfo?.pickupLocation}

Experience Details:
Activity: ${activity.title}
Type: ${booking.tourType === 'group' ? 'Group Tour' : 'Private Tour'}
Date: ${formatDate(booking.date)}
Duration: ${activity.duration}

Guests:
Adults: ${booking.guests?.adults}
${booking.guests?.children ? `Children: ${booking.guests.children}` : ''}

Payment Details:
Total Amount: $${booking.paymentDetails?.totalAmount}
Status: ${booking.paymentDetails?.status === 'confirmed' ? 'PAID' : 'PENDING'}

Thank you for booking with VIP Marrakech Trips!
`;

    // Create a blob with the receipt content
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `VIPMarrakechTrips_Receipt_${bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-highlight-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <Ticket size={30} className="text-stone-400" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-stone-800">Booking Error</h1>
          <p className="text-stone-600 mb-8">{error}</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-highlight-primary text-white hover:bg-highlight-primary/90 transition-colors"
          >
            Return Home
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    )
  }
  
  if (!booking || !activity) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <Ticket size={30} className="text-stone-400" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-stone-800">Booking Information Not Found</h1>
          <p className="text-stone-600 mb-8">We couldn't locate your booking details. Please contact our support team for assistance.</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-highlight-primary text-white hover:bg-highlight-primary/90 transition-colors"
          >
            Return Home
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Confetti effect container */}
      {showConfetti && (
        <div 
          ref={confettiRef} 
          className="fixed inset-0 pointer-events-none z-50"
        >
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 1 + 0.5
            const startX = Math.random() * 100
            const duration = Math.random() * 3 + 3
            const delay = Math.random() * 1.5
            const colors = [
              "bg-highlight-primary", 
              "bg-green-400", 
              "bg-blue-400", 
              "bg-purple-400", 
              "bg-amber-400", 
              "bg-rose-400"
            ]
            const color = colors[Math.floor(Math.random() * colors.length)]
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${color} opacity-80`}
                style={{
                  width: `${size}rem`,
                  height: `${size}rem`,
                  left: `${startX}%`,
                  top: "-10%",
                }}
                initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: ["0%", "100vh"],
                  x: [0, (Math.random() - 0.5) * 400],
                  rotate: [0, Math.random() * 720],
                  opacity: [1, 0.8, 0],
                  scale: [1, Math.random() + 0.5, 0],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  ease: "easeOut",
                }}
              />
            )
          })}
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        {/* Success Header with Ticket Metaphor */}
        <div className="mb-16">
          <div className="relative bg-white rounded-premium shadow-premium border border-stone-200 overflow-hidden max-w-3xl mx-auto transform hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300">
            {/* Colorful top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-highlight-primary to-pink-500"></div>
            
            {/* Ticket header */}
            <div className="pt-12 px-8 pb-8 text-center relative">
              {/* Punch holes on both sides of ticket */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-7 h-14 bg-stone-50 rounded-r-full"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-7 h-14 bg-stone-50 rounded-l-full"></div>
              
              {/* Success icon */}
              <motion.div 
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-400/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15,
                  delay: 0.2
                }}
              >
                <CheckCircle2 size={46} className="text-white" />
              </motion.div>
              
              {/* Confirmation text */}
              <motion.h1
                className="text-4xl font-bold mb-5 relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-highlight-primary">
                  Booking Confirmed!
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-stone-50 rounded-xl p-6 max-w-lg mx-auto border border-stone-100"
              >
                <p className="text-lg text-stone-700 leading-relaxed">
                  Thank you for booking with <span className="font-medium">VIP Marrakech Trips</span>. Your experience has been confirmed and a summary email will arrive shortly.
                </p>
              </motion.div>
            </div>
            
            {/* Ticket body - dashed separator */}
            <div className="relative py-0.5 px-0">
              <div className="absolute left-0 right-0 top-0 h-px border-t border-dashed border-stone-300"></div>
            </div>
            
            {/* Booking reference */}
            <div className="p-8 relative bg-stone-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <div>
                  <div className="text-sm text-stone-600 font-medium mb-2">Your Booking Reference</div>
                  <div className="text-3xl font-bold text-stone-800 tracking-wide">{bookingReference}</div>
                </div>
                
                <button
                  onClick={downloadReceipt}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-highlight-primary/20 hover:border-highlight-primary shadow-sm hover:shadow-glow transition-all font-medium text-stone-700 hover:text-highlight-primary"
                >
                  <Download size={18} />
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout - Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Details Card */}
            <div className="glass-card rounded-premium p-8 transform hover:translate-y-[-5px] transition-all duration-300">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
                  <Ticket size={16} className="text-highlight-primary" />
                </div>
                <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">YOUR EXPERIENCE</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="relative w-full sm:w-52 h-44 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                  <Image 
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 208px"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                    <span className="text-xs font-medium text-white">{activity.category}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-stone-900">{activity.title}</h2>
                  
                  <div className="flex flex-wrap items-center gap-y-3 gap-x-5 mb-6">
                    <div className="flex items-center gap-2 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <Calendar size={16} className="text-highlight-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {booking.date ? formatDate(booking.date) : 'Date not specified'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <Clock size={16} />
                      </div>
                      <span className="text-sm font-medium">{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Star size={16} className="fill-amber-500 text-amber-500" />
                      </div>
                      <span className="text-sm font-medium">{activity.rating} ({activity.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 shadow-sm">
                      <Users size={16} className="text-stone-700" />
                      <span className="text-sm font-medium text-stone-800">
                        {booking.guests?.adults} Adult{booking.guests?.adults !== 1 ? 's' : ''}
                        {booking.guests?.children ? `, ${booking.guests.children} Child${booking.guests.children !== 1 ? 'ren' : ''}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-highlight-primary/10 shadow-sm">
                      <Shield size={16} className="text-highlight-primary" />
                      <span className="text-sm font-medium text-highlight-primary">
                        {booking.tourType === 'group' ? 'Group Tour' : 'Private Tour'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pickup & Guest Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 transition-all hover:shadow-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                      <MapPin size={18} className="text-highlight-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600 font-medium">Pickup Location</div>
                      <div className="font-semibold text-stone-800">{booking.customerInfo?.pickupLocation || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 transition-all hover:shadow-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                      <Phone size={18} className="text-highlight-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-600 font-medium">Contact Number</div>
                      <div className="font-semibold text-stone-800">{booking.customerInfo?.phone || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Steps with Timeline */}
            <div className="glass-highlight rounded-premium p-8 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-highlight-primary/20 flex items-center justify-center flex-shrink-0">
                  <ThumbsUp size={16} className="text-highlight-primary" />
                </div>
                <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">WHAT'S NEXT</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-stone-900">Preparing For Your Adventure</h3>
              
              <div className="space-y-5 relative z-10">
                {/* Timeline with vertical connector */}
                <div className="absolute left-4 top-2 bottom-2 w-px bg-highlight-primary/20 z-0"></div>
                
                {/* Timeline items */}
                {[
                  { 
                    title: "Check your email",
                    description: "You'll receive a detailed confirmation email shortly with all your booking information."
                  },
                  { 
                    title: "Pack essentials",
                    description: "Prepare comfortable clothing, sunscreen, camera and any other items recommended for your activity."
                  },
                  { 
                    title: "Be ready for pickup",
                    description: "Our driver will arrive at your specified location 10 minutes before the scheduled time."
                  },
                  { 
                    title: "Enjoy your experience",
                    description: "Our expert guide will ensure you have an unforgettable Moroccan adventure."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative pl-10 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white flex items-center justify-center z-10 shadow-md border-2 border-highlight-primary/20 group-hover:border-highlight-primary transition-colors duration-300">
                      <span className="font-medium text-highlight-primary">{index + 1}</span>
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-highlight-primary/20 shadow-sm group-hover:shadow-glow transition-all duration-300">
                      <h4 className="font-semibold text-lg text-stone-900 group-hover:text-highlight-primary transition-colors duration-300">{item.title}</h4>
                      <p className="text-stone-700">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="glass-card rounded-premium p-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-highlight-primary" />
                </div>
                <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">YOUR INFORMATION</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl shadow-sm border border-stone-200 transition-all hover:shadow-md">
                  <div className="text-sm text-stone-600 font-medium mb-1">Full Name</div>
                  <div className="font-semibold text-stone-900 text-lg">{booking.customerInfo?.name}</div>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl shadow-sm border border-stone-200 transition-all hover:shadow-md">
                  <div className="text-sm text-stone-600 font-medium mb-1">Email Address</div>
                  <div className="font-semibold text-stone-900 text-lg">{booking.customerInfo?.email}</div>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl shadow-sm border border-stone-200 transition-all hover:shadow-md">
                  <div className="text-sm text-stone-600 font-medium mb-1">Phone Number</div>
                  <div className="font-semibold text-stone-900 text-lg">{booking.customerInfo?.phone}</div>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl shadow-sm border border-stone-200 transition-all hover:shadow-md">
                  <div className="text-sm text-stone-600 font-medium mb-1">Nationality</div>
                  <div className="font-semibold text-stone-900 text-lg">{booking.customerInfo?.nationality}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Payment Summary Card */}
              <div className="relative bg-white rounded-premium overflow-hidden border-2 border-stone-200 shadow-lg hover:shadow-xl transition-all">
                {/* Colorful top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>
                
                <div className="p-6 border-b border-stone-200">
                  <h3 className="text-xl font-bold text-stone-900 mb-6">Payment Summary</h3>
                  
                  {/* Price breakdown */}
                  <div className="mb-6 bg-stone-50 rounded-xl p-5 border border-stone-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-stone-700 font-medium">Tour type</span>
                      <span className="font-medium text-stone-900 capitalize">{booking.tourType}</span>
                    </div>
                    
                    {booking.tourType === 'group' && booking.activities && booking.activities[0] && (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-stone-700 font-medium">Adults ({booking.activities[0].adultCount})</span>
                          <span className="font-medium text-stone-900">${booking.activities[0].adultTotal}</span>
                        </div>
                        {booking.activities[0].childCount > 0 && (
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-stone-700 font-medium">Children ({booking.activities[0].childCount})</span>
                            <span className="font-medium text-stone-900">${booking.activities[0].childTotal}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {booking.tourType === 'private' && booking.activities && booking.activities[0] && (
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-stone-700 font-medium">Private tour</span>
                        <span className="font-medium text-stone-900">${booking.activities[0].totalPrice}</span>
                      </div>
                    )}
                    
                    <div className="h-px w-full bg-stone-300 my-3"></div>
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-semibold text-stone-900">Total</span>
                      <span className="font-bold text-highlight-primary">${booking.paymentDetails?.totalAmount}</span>
                    </div>
                  </div>
                  
                  {/* Payment Status */}
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-green-700 font-medium">Payment Status</div>
                        <div className="font-semibold text-green-800">Payment Successful</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-3">
                    <button 
                      onClick={downloadReceipt}
                      className="w-full py-3 rounded-xl bg-highlight-primary text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Download size={18} />
                      <span>Download Confirmation</span>
                    </button>
                    
                    <Link href="/" className="w-full py-3 rounded-xl bg-white border-2 border-stone-200 text-stone-700 font-medium hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
                      <span>Return to Homepage</span>
                    </Link>
                  </div>
                </div>
                
                {/* Contact Support */}
                <div className="p-6 bg-stone-50">
                  <div className="text-center mb-4">
                    <div className="text-sm font-medium text-stone-700 mb-2">Need Assistance?</div>
                    <div className="flex justify-center gap-4">
                      <div className="flex-1 p-3 bg-white rounded-lg shadow-sm border border-stone-200 text-center">
                        <div className="text-xs text-stone-600 mb-1">Email Us</div>
                        <div className="text-sm font-medium text-highlight-primary">support@example.com</div>
                      </div>
                      <div className="flex-1 p-3 bg-white rounded-lg shadow-sm border border-stone-200 text-center">
                        <div className="text-xs text-stone-600 mb-1">Call Us</div>
                        <div className="text-sm font-medium text-highlight-primary">+212 567 890 123</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trust elements */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-200">
                    <div className="w-8 h-5 bg-white rounded shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-stone-800">VISA</span>
                    </div>
                    <div className="w-8 h-5 bg-white rounded shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-stone-800">MC</span>
                    </div>
                    <div className="w-12 h-5 bg-white rounded shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <main className="bg-gradient-to-b from-stone-50 to-sand-100 min-h-screen">
      {/* Fixed Header */}
      <div className="sticky top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-all shadow-sm"
              >
                <ArrowLeft size={18} className="text-stone-700 group-hover:text-highlight-primary transition-colors" />
                <span className="text-sm font-medium text-stone-700 group-hover:text-highlight-primary transition-colors">Return Home</span>
              </Link>
              <h1 className="text-xl sm:text-2xl font-semibold text-stone-900">Booking Confirmation</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm border border-green-100">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-700 hidden sm:inline">Booking Confirmed</span>
            </div>
          </div>
        </div>
      </div>
      
      <ConfirmationContent />
    </main>
  )
} 