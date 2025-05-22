"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Check, CreditCard, Clock, MapPin, Users, User, Shield, ChevronRight, Info, Camera, Star, ChevronLeft } from 'lucide-react'
import { allActivities } from '@/data/activities'
import { Activity } from '@/types/activity'
import { Booking } from '@/types/booking'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { createBooking } from '@/lib/firebase/services'

export default function BookingPage({ params, searchParams }: { 
  params: { id: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingDate, setBookingDate] = useState<Date>(new Date())
  const [formattedDate, setFormattedDate] = useState('')
  const datePickerRef = useRef<HTMLInputElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    confirmPhone: '',
    nationality: '',
    pickupLocation: ''
  })
  
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Get query params
  const tourType = searchParams.type as string || 'group'
  const adults = parseInt(searchParams.adults as string || '2')
  const children = parseInt(searchParams.children as string || '0')
  
  // Scroll to section
  const bookingSummaryRef = useRef<HTMLDivElement>(null)
  const personalInfoRef = useRef<HTMLDivElement>(null)
  
  // Additional state
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }
  
  // Get first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }
  
  // Toggle calendar
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  }
  
  // Change month
  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  }
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setBookingDate(newDate);
    setFormattedDate(formatDate(newDate));
    setShowCalendar(false);
  }
  
  // Check if date is in the past
  const isDateInPast = (day: number) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
  
  // Generate calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-6 w-6"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === currentMonth.getMonth() && 
        new Date().getFullYear() === currentMonth.getFullYear();
        
      const isSelected = 
        bookingDate.getDate() === day && 
        bookingDate.getMonth() === currentMonth.getMonth() && 
        bookingDate.getFullYear() === currentMonth.getFullYear();
        
      const isPast = isDateInPast(day);
      
      const buttonClasses = `h-6 w-6 rounded-full flex items-center justify-center text-xs transition-all
        ${isPast ? 'text-stone-300 cursor-not-allowed' : 'hover:bg-highlight-primary hover:text-white'}
        ${isToday && !isSelected ? 'border border-highlight-primary text-highlight-primary' : ''}
        ${isSelected ? 'bg-highlight-primary text-white' : ''}`;
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(day)}
          disabled={isPast}
          className={buttonClasses}
        >
          {day}
        </button>
      );
    }
    
    return days;
  }
  
  // Calculate prices
  const calculateBasePrice = () => {
    if (!activity) return 0
    
    if (tourType === 'group') {
      return activity.options.group.price
    } else {
      // Private tour pricing logic
      const { privateTierPricing } = activity.options.private
      if (!privateTierPricing) return activity.options.private.price
      
      const totalGuests = adults + children
      if (totalGuests <= privateTierPricing.tier1.maxPeople) {
        return privateTierPricing.tier1.price
      } else {
        return privateTierPricing.tier2.price
      }
    }
  }
  
  const calculateTotalPrice = () => {
    if (!activity) return 0
    const basePrice = calculateBasePrice()
    
    if (tourType === 'group') {
      // Group tour is per person
      return (basePrice * adults) + (activity.options.group.childPrice * children)
    } else {
      // Private tour is flat rate
      return basePrice
    }
  }
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  // Handle date change
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setBookingDate(date)
      setFormattedDate(formatDate(date))
    }
  }
  
  // Open date picker
  const openDatePicker = () => {
    toggleCalendar();
  }
  
  // Validate form
  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    // Required fields
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (!formData.confirmPhone.trim()) errors.confirmPhone = "Confirmation phone is required"
    if (!formData.nationality.trim()) errors.nationality = "Nationality is required"
    if (!formData.pickupLocation.trim()) errors.pickupLocation = "Pickup location is required"
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    
    // Phone matching
    if (formData.phone && formData.confirmPhone && formData.phone !== formData.confirmPhone) {
      errors.confirmPhone = "Phone numbers do not match"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    
    if (!activity) return
    
    setIsProcessing(true)
    
    try {
      // Create booking object
      const bookingData: Partial<Booking> = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          confirmPhone: formData.confirmPhone,
          nationality: formData.nationality,
          pickupLocation: formData.pickupLocation
        },
        date: bookingDate,
        tourType: tourType as 'group' | 'private',
        activities: [{
          id: activity.id,
          name: activity.title,
          basePrice: calculateBasePrice(),
          childPrice: activity.options[tourType as 'group' | 'private'].childPrice,
          adultCount: adults,
          childCount: children,
          adultTotal: tourType === 'group' ? activity.options.group.price * adults : 0,
          childTotal: tourType === 'group' && children > 0 ? activity.options.group.childPrice * children : 0,
          totalPrice: calculateTotalPrice()
        }],
        guests: {
          adults,
          children
        },
        airportTransfer: null,
        paymentDetails: {
          status: 'confirmed',
          totalAmount: calculateTotalPrice().toString(),
          currency: 'USD'
        },
        status: 'confirmed'
      }
      
      // Save to Firestore
      const bookingReference = await createBooking(bookingData)
      
      if (!bookingReference) {
        throw new Error("Failed to create booking")
      }
      
      // Redirect to confirmation page with just the reference
      router.push(`/confirmation?reference=${bookingReference}`)
    } catch (error) {
      console.error('Error creating booking:', error)
      setIsProcessing(false)
      alert('There was an error processing your booking. Please try again.')
    }
  }
  
  // Fetch activity data
  useEffect(() => {
    const activityId = parseInt(params.id)
    if (isNaN(activityId)) {
      router.push('/')
      return
    }
    
    const foundActivity = allActivities.find(a => a.id === activityId)
    if (foundActivity) {
      setActivity(foundActivity)
    } else {
      router.push('/')
    }
    
    setLoading(false)
  }, [params.id, router])
  
  // Set formatted date on initial load
  useEffect(() => {
    setFormattedDate(formatDate(bookingDate))
  }, [])
  
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!activity) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Experience Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the experience you're looking for.</p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white">
          Return Home
        </Link>
      </div>
    )
  }
  
  // Date Selection component
  const renderDateSelection = () => {
    return (
      <div className="bg-white rounded-premium p-8 shadow-lg border border-stone-200 transform hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-8 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar size={16} className="text-highlight-primary" />
          </div>
          <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">SELECT DATE</span>
        </div>
        
        <div>
          <label className="block text-stone-800 font-semibold text-lg mb-4">When would you like to experience this activity?</label>
          
          <div className="relative">
            <DatePicker
              selected={bookingDate}
              onChange={handleDateChange}
              minDate={new Date()}
              customInput={
                <button
                  type="button" 
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 border-stone-200 hover:border-highlight-primary transition-all bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                      <Calendar size={18} className="text-highlight-primary" />
                    </div>
                    <span className="text-stone-800 font-medium">{formattedDate}</span>
                  </div>
                  <ChevronRight size={18} className="text-highlight-primary" />
                </button>
              }
              calendarClassName="bg-white rounded-xl shadow-lg border border-stone-200 p-3"
              dayClassName={() => "text-stone-800 hover:bg-highlight-primary hover:text-white hover:rounded-full"}
              monthClassName={() => "text-lg font-medium text-stone-800"}
              weekDayClassName={() => "text-sm font-medium text-stone-500"}
              fixedHeight
              showPopperArrow={false}
              popperPlacement="bottom-end"
            />
          </div>
          
          <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-green-50 border border-green-100">
            <Check size={16} className="text-green-600" />
            <p className="text-sm font-medium text-green-700">
              Free cancellation up to 24 hours before the experience
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (    <main className="bg-gradient-to-b from-stone-50 to-sand-100 min-h-screen">      {/* Booking Header */}      <div className="sticky top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-stone-200">        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">          <div className="flex items-center justify-between">            <div className="flex items-center gap-4">              
              <Link                
                href={`/activities/${activity.id}`}                
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-all shadow-sm"              
              >                
                <ArrowLeft size={18} className="text-stone-700 group-hover:text-highlight-primary transition-colors" />                
                <span className="text-sm font-medium text-stone-700 group-hover:text-highlight-primary transition-colors">Back to Activity</span>              
              </Link>              
              <h1 className="text-xl sm:text-2xl font-semibold text-stone-900">Complete Your Booking</h1>            
            </div>
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm border border-green-100">              <Shield size={16} className="text-green-600" />              <span className="text-sm font-medium text-green-700 hidden sm:inline">Secure Checkout</span>            </div>          </div>        </div>      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
                    <div className="lg:col-span-2 space-y-10">            {/* Activity Summary */}            <div className="bg-white rounded-premium p-8 shadow-lg border border-stone-200 transform hover:shadow-xl transition-all duration-300">              <div className="flex items-center gap-3 mb-7">                <div className="w-8 h-8 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">                  <Check size={16} className="text-highlight-primary" />                </div>                <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">YOUR EXPERIENCE</span>              </div>                            <div className="flex flex-col sm:flex-row gap-8">                <div className="relative w-full sm:w-52 h-44 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">                  <Image                     src={activity.image}                    alt={activity.title}                    fill                    className="object-cover"                    sizes="(max-width: 768px) 100vw, 208px"                  />                                    {/* Category Badge */}                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">                    <span className="text-xs font-medium text-white">{activity.category}</span>                  </div>                </div>                                <div className="flex-1">                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-stone-900">{activity.title}</h2>                                    <div className="flex flex-wrap items-center gap-y-3 gap-x-5 mb-6">                    <div className="flex items-center gap-2 text-stone-700">                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">                        <Clock size={16} />                      </div>                      <span className="text-sm font-medium">{activity.duration}</span>                    </div>                    <div className="flex items-center gap-2 text-stone-700">                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">                        <MapPin size={16} />                      </div>                      <span className="text-sm font-medium">{activity.location}</span>                    </div>                    <div className="flex items-center gap-2 text-stone-700">                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">                        <Star size={16} className="fill-amber-500 text-amber-500" />                      </div>                      <span className="text-sm font-medium">{activity.rating} ({activity.reviewCount} reviews)</span>                    </div>                  </div>                                    <div className="flex flex-wrap items-center gap-4 mb-4">                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 shadow-sm">                      <Users size={16} className="text-stone-700" />                      <span className="text-sm font-medium text-stone-800">                        {adults} Adult{adults !== 1 ? 's' : ''}                        {children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}                      </span>                    </div>                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-highlight-primary/10 shadow-sm">                      <Check size={16} className="text-highlight-primary" />                      <span className="text-sm font-medium text-highlight-primary">{tourType === 'group' ? 'Group Tour' : 'Private Tour'}</span>                    </div>                  </div>                </div>              </div>            </div>
            
                        {/* Date Selection */}            {renderDateSelection()}
            
                        {/* Personal Information */}            <div ref={personalInfoRef} className="bg-white rounded-premium p-8 shadow-lg border border-stone-200 transform hover:shadow-xl transition-all duration-300">              <div className="flex items-center gap-3 mb-7">                <div className="w-8 h-8 rounded-full bg-highlight-primary/10 flex items-center justify-center flex-shrink-0">                  <Users size={16} className="text-highlight-primary" />                </div>                <span className="text-base font-semibold text-highlight-primary uppercase tracking-wide">PERSONAL INFORMATION</span>              </div>              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label htmlFor="name" className="block text-stone-800 font-medium mb-2">Full Name</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.name ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {formErrors.name && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-stone-800 font-medium mb-2">Email Address</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.email ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {formErrors.email && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.email}</p>}
                    <p className="text-sm text-stone-600 mt-2">We'll send the confirmation to this email</p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-stone-800 font-medium mb-2">Phone Number</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.phone ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.phone ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPhone" className="block text-stone-800 font-medium mb-2">Confirm Phone Number</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.confirmPhone ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="tel"
                        id="confirmPhone"
                        name="confirmPhone"
                        value={formData.confirmPhone}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.confirmPhone ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Confirm your phone number"
                      />
                    </div>
                    {formErrors.confirmPhone && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.confirmPhone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="nationality" className="block text-stone-800 font-medium mb-2">Nationality</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.nationality ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.nationality ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Your nationality"
                      />
                    </div>
                    {formErrors.nationality && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.nationality}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="pickupLocation" className="block text-stone-800 font-medium mb-2">Pickup Location</label>
                    <div className={`relative rounded-xl overflow-hidden transition-all ${formErrors.pickupLocation ? 'shadow-error' : 'focus-within:shadow-glow'}`}>
                      <input
                        type="text"
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 border-2 ${formErrors.pickupLocation ? 'border-red-500 bg-red-50' : 'border-stone-200 focus:border-highlight-primary'} outline-none transition-colors bg-white`}
                        placeholder="Hotel name or address"
                      />
                    </div>
                    {formErrors.pickupLocation && <p className="text-red-600 text-sm font-medium mt-2">{formErrors.pickupLocation}</p>}
                    <p className="text-sm text-stone-600 mt-2">Where should we pick you up?</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
                    {/* Right Column - Booking Summary */}          <div className="lg:col-span-1">            <div ref={bookingSummaryRef} className="sticky top-24">              {/* Booking Summary */}              <div className="rounded-premium overflow-hidden border-2 border-stone-200 shadow-lg bg-white hover:shadow-xl transition-all">                <div className="p-8 border-b border-stone-200">                  <h3 className="text-2xl font-bold text-stone-900 mb-6">Order Summary</h3>                                    {/* Price breakdown */}                  <div className="mb-6 bg-stone-50 rounded-xl p-5 border border-stone-200">                    <div className="flex justify-between items-center mb-3">                      <span className="text-stone-700 font-medium">Tour type</span>                      <span className="font-medium text-stone-900 capitalize">{tourType}</span>                    </div>                                        {tourType === 'group' && (                      <>                        <div className="flex justify-between items-center mb-3">                          <span className="text-stone-700 font-medium">Adults ({adults})</span>                          <span className="font-medium text-stone-900">${activity.options.group.price * adults}</span>                        </div>                        {children > 0 && (                          <div className="flex justify-between items-center mb-3">                            <span className="text-stone-700 font-medium">Children ({children})</span>                            <span className="font-medium text-stone-900">${activity.options.group.childPrice * children}</span>                          </div>                        )}                      </>                    )}                                        {tourType === 'private' && (                      <div className="flex justify-between items-center mb-3">                        <span className="text-stone-700 font-medium">Private tour</span>                        <span className="font-medium text-stone-900">${calculateBasePrice()}</span>                      </div>                    )}                                        <div className="h-px w-full bg-stone-300 my-3"></div>                    <div className="flex justify-between items-center text-xl">                      <span className="font-semibold text-stone-900">Total</span>                      <span className="font-bold text-highlight-primary">${calculateTotalPrice()}</span>                    </div>                  </div>                                    {/* Date Summary */}                  <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200">                    <div className="flex gap-3">                      <Calendar size={20} className="text-highlight-primary mt-0.5 flex-shrink-0" />                      <div>                        <span className="text-stone-700 font-medium">Tour Date</span>                        <p className="text-stone-900 font-medium">{formattedDate}</p>                      </div>                    </div>                  </div>                                    {/* Payment Info */}                  <div className="mb-8 space-y-3">                    <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">                      <Info size={18} className="text-blue-600 flex-shrink-0" />                      <span className="text-sm font-medium text-blue-700">Pay the full amount now to confirm your booking</span>                    </div>                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">                      <Check size={18} className="text-green-600 flex-shrink-0" />                      <span className="text-sm font-medium text-green-700">Free cancellation up to 24 hours before</span>                    </div>                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">                      <Check size={18} className="text-green-600 flex-shrink-0" />                      <span className="text-sm font-medium text-green-700">Instant confirmation via email</span>                    </div>                  </div>                                    {/* CTA Button */}                  <button                     onClick={handleSubmit}                    disabled={isProcessing}                    className="w-full py-4 rounded-xl bg-highlight-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-highlight-primary shadow-lg shadow-highlight-primary/20 hover:shadow-highlight-primary/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"                  >                    {isProcessing ? (                      <>                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>                        <span>Processing...</span>                      </>                    ) : (                      <>                        <CreditCard size={20} />                        <span>Proceed to Payment</span>                      </>                    )}                  </button>                </div>                                {/* Trust Badges */}                <div className="p-6 bg-stone-50">                  <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-5">                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">                      <Shield size={18} className="text-green-600" />                      <span className="text-sm font-medium text-stone-800">Secure Payment</span>                    </div>                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">                      <Camera size={18} className="text-green-600" />                      <span className="text-sm font-medium text-stone-800">Verified Activity</span>                    </div>                  </div>                  <div className="flex justify-center gap-4">                    <div className="w-10 h-6 bg-white rounded shadow-sm flex items-center justify-center">                      <span className="text-xs font-bold text-stone-800">VISA</span>                    </div>                    <div className="w-10 h-6 bg-white rounded shadow-sm flex items-center justify-center">                      <span className="text-xs font-bold text-stone-800">MC</span>                    </div>                    <div className="w-10 h-6 bg-white rounded shadow-sm flex items-center justify-center">                      <span className="text-xs font-bold text-stone-800">AMEX</span>                    </div>                    <div className="w-14 h-6 bg-white rounded shadow-sm flex items-center justify-center">                      <span className="text-xs font-bold text-blue-600">PayPal</span>                    </div>                  </div>                </div>              </div>            </div>          </div>
        </div>
      </div>
    </main>
  )
} 