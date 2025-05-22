"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Clock, Users, User, ChevronRight, Heart, MapPin, Shield, Camera, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { allActivities } from '@/data/activities'
import { Activity } from '@/types/activity'

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedType, setSelectedType] = useState<'group' | 'private'>('private')
  const galleryRef = useRef<HTMLDivElement>(null)
  const [guests, setGuests] = useState({ adults: 2, children: 0 })
  
  // Parallax effect state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Calculate base price based on selection
  const calculateBasePrice = () => {
    if (!activity) return 0
    if (selectedType === 'group') {
      return activity.options.group.price
    } else {
      // Private tour pricing logic
      const { privateTierPricing } = activity.options.private
      if (!privateTierPricing) return activity.options.private.price
      
      const totalGuests = guests.adults + guests.children
      if (totalGuests <= privateTierPricing.tier1.maxPeople) {
        return privateTierPricing.tier1.price
      } else {
        return privateTierPricing.tier2.price
      }
    }
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!activity) return 0
    const basePrice = calculateBasePrice()
    
    if (selectedType === 'group') {
      // Group tour is per person
      return (basePrice * guests.adults) + (activity.options.group.childPrice * guests.children)
    } else {
      // Private tour is flat rate
      return basePrice
    }
  }
  
  // Handle mouse movement for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    
    const { left, top, width, height } = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setCursorPosition({ x, y })
  }
  
  // Scroll gallery images
  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return
    
    const scrollAmount = 320
    galleryRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
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
      // Get the tour type from URL if it exists
      const searchParams = new URLSearchParams(window.location.search)
      const typeParam = searchParams.get('type')
      if (typeParam && (typeParam === 'group' || typeParam === 'private')) {
        setSelectedType(typeParam)
      } else {
        // If no type parameter is specified, load from localStorage
        const savedTourType = localStorage.getItem('preferredTourType')
        if (savedTourType === 'private' || savedTourType === 'group') {
          setSelectedType(savedTourType)
        }
      }
    } else {
      router.push('/')
    }
    
    setLoading(false)
  }, [params.id, router])
  
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
  
  return (
    <main className="w-full bg-white">
      {/* Hero Section with Parallax */}
      <div 
        ref={heroRef}
        className="relative w-full h-[70vh] overflow-hidden hero-parallax-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hero background */}
        <div className="absolute inset-0 bg-black">
          <Image 
            src={activity.image} 
            alt={activity.title} 
            fill
            priority
            className="object-cover opacity-90 hero-parallax-image"
            style={{
              transform: isHovering ? 
                `scale(1.02) translate(${(cursorPosition.x - 0.5) * -10}px, ${(cursorPosition.y - 0.5) * -10}px)` : 
                'scale(1)'
            }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>
        
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="hero-back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
        
        {/* Hero Content with enhanced design */}
        <div className="absolute bottom-0 left-0 w-full z-10 pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            {/* Glass backdrop for content */}
            <div className="hero-glass-panel">
              {/* Category Badge */}
              <div className="highlight-badge-static mb-4">
                <span className="text-white text-sm font-medium">{activity.category}</span>
              </div>
              
              {/* Title and Rating */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-2 text-glow-premium">
                    {activity.title}
                  </h1>
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-1.5">
                      <Star size={18} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium">{activity.rating}</span>
                      <span className="text-white/70">({activity.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={18} />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={18} />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Preview with enhanced design */}
                <div className="flex flex-col items-end">
                  <div className="text-white/80 text-base">From</div>
                  <div className="text-3xl font-semibold text-white text-glow-premium">${calculateBasePrice()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-8 right-8 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all hover-scale"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={22} 
            className={isFavorite ? "fill-red-500 text-red-500" : ""} 
          />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 relative">
            {/* Description Section */}
            <div className="glass-card mb-16 p-8 rounded-premium transform hover:translate-y-[-5px] transition-all duration-300 relative overflow-hidden">
              <div className="sand-noise-bg absolute inset-0 opacity-5"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 bg-highlight-primary"></div>
                  <span className="text-sm text-highlight-primary font-medium">ABOUT THE EXPERIENCE</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {activity.description}
                </p>
                
                {/* Highlights */}
                {activity.highlights && activity.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activity.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="mt-0.5 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 shadow-subtle group-hover:shadow-subtle-hover transition-all duration-300 group-hover:bg-highlight-primary/10">
                            <Check size={16} className="text-stone-700 group-hover:text-highlight-primary transition-colors duration-300" />
                          </div>
                          <p className="text-gray-700">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Gallery Section */}
            {activity.gallery && activity.gallery.length > 0 && (
              <div className="glass-highlight mb-16 p-8 rounded-premium overflow-hidden">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-8 bg-highlight-primary"></div>
                      <span className="text-sm text-highlight-primary font-medium">GALLERY</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">Experience Preview</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => scrollGallery('left')}
                      className="w-10 h-10 rounded-full border border-highlight-primary/30 flex items-center justify-center hover:bg-highlight-primary/10 transition-colors"
                    >
                      <ChevronRight size={20} className="transform rotate-180 text-highlight-primary" />
                    </button>
                    <button 
                      onClick={() => scrollGallery('right')}
                      className="w-10 h-10 rounded-full border border-highlight-primary/30 flex items-center justify-center hover:bg-highlight-primary/10 transition-colors"
                    >
                      <ChevronRight size={20} className="text-highlight-primary" />
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={galleryRef}
                  className="flex overflow-x-auto gap-4 pb-4 scrollbar-custom"
                >
                  {activity.gallery.map((item, index) => (
                    <div 
                      key={index}
                      className="relative flex-shrink-0 w-[320px] h-[220px] rounded-premium overflow-hidden cursor-pointer shadow-subtle hover:shadow-glow transition-all duration-500 transform hover:scale-[1.02]"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image 
                        src={item.url}
                        alt={`${activity.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Itinerary Section */}
            {activity.itinerary && activity.itinerary.length > 0 && (
              <div className="glass-card mb-16 p-8 rounded-premium transform hover:translate-y-[-5px] transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 bg-highlight-primary"></div>
                  <span className="text-sm text-gray-700 font-medium">JOURNEY</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detailed Itinerary</h2>
                
                <div className="space-y-6">
                  {activity.itinerary.map((item, index) => (
                    <div key={index} className="relative pl-10 pb-6 group">
                      {/* Connector Line */}
                      {index < activity.itinerary!.length - 1 && (
                        <div className="absolute left-4 top-4 bottom-0 w-px bg-gray-200 z-0 group-hover:bg-highlight-primary/30 transition-colors duration-300"></div>
                      )}
                      
                      {/* Step Number */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full glass-card flex items-center justify-center z-10 group-hover:shadow-glow transition-all duration-300 border border-highlight-primary/20">
                        <span className="font-medium text-stone-700 group-hover:text-highlight-primary transition-colors duration-300">{index + 1}</span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-highlight-primary transition-colors duration-300">{item.activity}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Included/Not Included Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {activity.included && activity.included.length > 0 && (
                <div className="glass-card p-6 rounded-premium h-full transform hover:translate-y-[-5px] transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {activity.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 shadow-subtle group-hover:shadow-subtle-hover transition-all duration-300 group-hover:bg-green-100">
                          <Check size={16} className="text-green-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activity.notIncluded && activity.notIncluded.length > 0 && (
                <div className="glass-card p-6 rounded-premium h-full transform hover:translate-y-[-5px] transition-all duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Not Included</h3>
                  <ul className="space-y-3">
                    {activity.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 shadow-subtle group-hover:shadow-subtle-hover transition-all duration-300 group-hover:bg-red-100">
                          <div className="w-2.5 h-0.5 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Recommendations Section */}
            {activity.recommendations && activity.recommendations.length > 0 && (
              <div className="mb-16 glass-highlight rounded-premium p-8 transform hover:translate-y-[-5px] transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-subtle hover:shadow-glow transition-all duration-300 border border-highlight-primary/20">
                    <Shield size={20} className="text-highlight-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Travel Recommendations</h3>
                    <p className="text-gray-600 mb-6">We recommend you bring the following items to enhance your experience:</p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activity.recommendations.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-subtle group-hover:shadow-glow transition-all duration-300">
                            <Check size={14} className="text-highlight-primary" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Premium booking card */}
              <div className="rounded-premium overflow-hidden border border-stone-200 shadow-card-hover bg-white">
                <div className="p-6 border-b border-stone-200">
                  <h3 className="text-xl font-semibold mb-6 text-black">Book This Experience</h3>
                  
                  {/* Tour Type Display (read-only) */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Tour Type</label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-50 border border-stone-200">
                      {selectedType === 'private' ? (
                        <>
                          <User size={18} className="text-highlight-primary" />
                          <span className="font-medium text-stone-800">Private Tour</span>
                          <span className="text-sm text-stone-500 ml-2">Exclusive experience with your own guide</span>
                        </>
                      ) : (
                        <>
                          <Users size={18} className="text-highlight-primary" />
                          <span className="font-medium text-stone-800">Group Tour</span>
                          <span className="text-sm text-stone-500 ml-2">Join other travelers</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Number of Guests */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Guests</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Adults</label>
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          >
                            -
                          </button>
                          <div className="flex-1 text-center font-medium text-gray-900">{guests.adults}</div>
                          <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Children</label>
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          >
                            -
                          </button>
                          <div className="flex-1 text-center font-medium text-gray-900">{guests.children}</div>
                          <button 
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                            onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Summary */}
                  <div className="mb-6 bg-stone-50 rounded-premium p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">Base price</span>
                      <span className="font-medium text-gray-900">${calculateBasePrice()}</span>
                    </div>
                    {selectedType === 'group' && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-900">Adults ({guests.adults})</span>
                          <span className="font-medium text-gray-900">${activity.options.group.price * guests.adults}</span>
                        </div>
                        {guests.children > 0 && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-900">Children ({guests.children})</span>
                            <span className="font-medium text-gray-900">${activity.options.group.childPrice * guests.children}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="h-px w-full bg-stone-200 my-3"></div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium text-black">Total</span>
                      <span className="font-semibold text-black">${calculateTotalPrice()}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    className="w-full py-3.5 rounded-full bg-black text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    onClick={() => router.push(`/booking/${activity.id}?type=${selectedType}&adults=${guests.adults}&children=${guests.children}`)}
                  >
                    <span>Book Experience</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
                
                {/* Trust Badges */}
                <div className="p-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">Secure booking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-green-600" />
                      <span className="text-sm text-gray-600">Verified activity</span>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    Free cancellation up to 24 hours before the experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Experiences */}
      <div className="bg-stone-50 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-highlight-primary"></div>
                <span className="text-sm text-highlight-primary font-medium">DISCOVER MORE</span>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900">Similar Experiences</h2>
            </div>
            <Link 
              href="/#activities" 
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-highlight-primary/30 hover:bg-white transition-colors group"
            >
              <span className="text-gray-700 group-hover:text-highlight-primary transition-colors">View all</span>
              <ArrowRight size={16} className="text-gray-700 group-hover:text-highlight-primary transition-colors" />
            </Link>
          </div>
          
          {/* Related experiences grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(() => {
              // Get similar activities from the same category
              let similarActivities = allActivities
                .filter(a => a.id !== activity.id && a.category === activity.category);
              
              // If we don't have 3 activities from the same category, add some from other categories
              if (similarActivities.length < 3) {
                const otherActivities = allActivities
                  .filter(a => a.id !== activity.id && a.category !== activity.category)
                  .slice(0, 3 - similarActivities.length);
                
                similarActivities = [...similarActivities, ...otherActivities];
              }
              
              // Make sure we only show 3 activities
              return similarActivities.slice(0, 3).map((relatedActivity) => (
                <div 
                  key={relatedActivity.id}
                  className="premium-card card-glow-hover group cursor-pointer"
                  onClick={() => router.push(`/activities/${relatedActivity.id}?type=${selectedType}`)}
                >
                  <div className="premium-card-media h-[250px]">
                    <Image
                      src={relatedActivity.image}
                      alt={relatedActivity.title}
                      fill
                      className="premium-card-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {relatedActivity.isBestSeller && (
                      <div className="premium-card-badge">
                        <Star size={16} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-black">{relatedActivity.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="premium-card-content">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-stone-600 text-sm">
                        <Clock size={14} />
                        <span>{relatedActivity.duration}</span>
                      </div>
                    </div>
                    
                    <h3 className="premium-card-title">{relatedActivity.title}</h3>
                    <p className="premium-card-description">{relatedActivity.description}</p>
                    
                    <div className="flex justify-between items-baseline pt-4 border-t border-stone-100 mt-auto">
                      <div>
                        <div className="text-sm text-stone-500">From</div>
                        <div className="premium-card-price">${relatedActivity.options.group.price}</div>
                      </div>
                      <div className="premium-card-button group-hover:bg-highlight-primary transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
          
          {/* Mobile View All Button */}
          <div className="mt-12 flex md:hidden items-center justify-center">
            <Link 
              href="/#activities" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-highlight-primary text-white hover:bg-highlight-primary/90 transition-colors shadow-glow"
            >
              <span>View all experiences</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 