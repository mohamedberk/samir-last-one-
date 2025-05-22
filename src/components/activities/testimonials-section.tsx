"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Quote, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    location: "London, UK",
    image: "https://ik.imagekit.io/momh2323/Oukaimeden.jpg?updatedAt=1745258287453",
    title: "Desert Sunset Tour",
    rating: 5,
    quote: "Our Moroccan adventure was nothing short of magical. The desert sunset was breathtaking, and our guide's knowledge of the local culture made this trip unforgettable.",
    date: "October 2023"
  },
  {
    id: 2,
    name: "James Rodriguez",
    location: "Barcelona, Spain",
    image: "https://ik.imagekit.io/momh2323/ourikaa.jpg?updatedAt=1745258287408",
    title: "Marrakech Food Tour",
    rating: 5,
    quote: "The authentic flavors we experienced were incredible. From hidden gem restaurants to vibrant markets, this food tour revealed the true essence of Moroccan cuisine.",
    date: "September 2023"
  },
  {
    id: 3,
    name: "Emma Chen",
    location: "Toronto, Canada",
    image: "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
    title: "Atlas Mountains Trek",
    rating: 5,
    quote: "The Atlas Mountains trek was challenging but rewarding. Our guide was knowledgeable about the terrain and ensured our safety while sharing fascinating insights about Berber culture.",
    date: "November 2023"
  },
  {
    id: 4,
    name: "Michael Okafor",
    location: "Lagos, Nigeria",
    image: "https://ik.imagekit.io/momh2323/Lake%20Lalla%20Takerkoust.jpg?updatedAt=1745515546996",
    title: "Private Desert Excursion",
    rating: 5,
    quote: "The attention to detail on our private desert excursion was impeccable. From the luxury camp to the camel ride at sunrise, every moment was perfectly curated.",
    date: "August 2023"
  },
  {
    id: 5,
    name: "Sophie Laurent",
    location: "Paris, France",
    image: "https://images.pexels.com/photos/16786866/pexels-photo-16786866/free-photo-of-moroccan-village-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Cooking Class Experience",
    rating: 5,
    quote: "Learning to make authentic tagine changed how I approach cooking. The class was intimate, hands-on, and we got to enjoy our creations in a beautiful riad setting.",
    date: "December 2023"
  }
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const autoPlayInterval = 5000 // 5 seconds between transitions
  const [progress, setProgress] = useState(0)
  
  // Navigate to previous testimonial
  const prevTestimonial = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    
    // Reset progress
    setProgress(0)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }, [isAnimating])
  
  // Navigate to next testimonial
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    
    // Reset progress
    setProgress(0)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }, [isAnimating])
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    
    // If swipe distance is significant
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextTestimonial() // Swipe left, go to next
      } else {
        prevTestimonial() // Swipe right, go to previous
      }
      
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 5000)
    }
  }
  
  // Progress tracking effect
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      return
    }
    
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // Start a new interval to update progress
    const updateInterval = 50 // Update every 50ms for smooth animation
    const progressIncrement = (updateInterval / autoPlayInterval) * 100
    
    setProgress(0)
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressIncrement
        return newProgress > 100 ? 100 : newProgress
      })
    }, updateInterval)
    
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPaused, activeIndex, autoPlayInterval])
  
  // Auto-rotation effect
  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current)
      }
      
      autoPlayIntervalRef.current = setTimeout(() => {
        if (!isPaused && !isAnimating) {
          nextTestimonial()
        }
      }, autoPlayInterval)
    }
    
    startAutoPlay()
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearTimeout(autoPlayIntervalRef.current)
      }
    }
  }, [isPaused, isAnimating, nextTestimonial, autoPlayInterval, activeIndex])
  
  // Progress effect - when progress reaches 100%, go to next slide
  useEffect(() => {
    if (progress >= 100 && !isPaused) {
      nextTestimonial()
    }
  }, [progress, isPaused, nextTestimonial])
  
  return (
    <section 
      className="w-full bg-purple-gradient relative py-16 overflow-hidden"
    >
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      {/* Background decoration elements */}
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-highlight-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-highlight-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section heading - now matching experience-tabs styling */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-highlight-primary"></div>
            <span className="text-sm font-medium tracking-wide text-highlight-primary">GUEST EXPERIENCES</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight">
                Voices of Adventure
              </h2>
              <p className="mt-2 text-stone-600 max-w-lg">
                Read what our guests have to say about their unforgettable Moroccan journeys with us.
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              {/* Navigation buttons */}
              <button 
                onClick={() => {
                  prevTestimonial()
                  setIsPaused(true)
                  // Resume auto-rotation after 5 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 5000)
                }}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all hover:shadow-subtle"
                aria-label="Previous testimonial"
                disabled={isAnimating}
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => {
                  nextTestimonial()
                  setIsPaused(true)
                  // Resume auto-rotation after 5 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 5000)
                }}
                className="w-10 h-10 rounded-full bg-highlight-primary shadow-sm flex items-center justify-center text-white transition-all hover:shadow-purple-glow"
                aria-label="Next testimonial"
                disabled={isAnimating}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced testimonial layout with touch capabilities */}
        <div 
          className="relative" 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main featured testimonial */}
          <div 
            className={cn(
              "grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 mb-8 transition-all duration-500",
              isAnimating ? "opacity-80 scale-98" : "opacity-100 scale-100"
            )}
          >
            {/* Left side - Quote */}
            <div className="md:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-stone-200 relative shadow-card hover:shadow-card-hover transition-all duration-300 group">
              {/* Decorative elements */}
              <div className="absolute -left-6 -bottom-6 w-12 h-12 rounded-full bg-highlight-primary/10 hidden md:block"></div>
              <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-highlight-primary/20 hidden md:block"></div>
              
              {/* Large quote mark in background */}
              <div className="absolute top-6 left-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Quote size={120} strokeWidth={0.5} />
              </div>
              
              {/* Quote content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-highlight-primary text-highlight-primary" />
                  ))}
                </div>
                
                <p className="text-xl sm:text-2xl font-medium text-stone-900 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center justify-between flex-wrap gap-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-highlight-primary/20 shadow-sm relative">
                      <Image 
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        fill
                        className="object-cover object-center"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-stone-900">{testimonials[activeIndex].name}</h4>
                      <p className="text-sm text-stone-500">{testimonials[activeIndex].location}</p>
                    </div>
                  </div>
                  <span className="text-sm text-stone-400 bg-stone-50 px-3 py-1 rounded-full">{testimonials[activeIndex].date}</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="hidden md:block md:col-span-5 rounded-xl overflow-hidden relative h-auto shadow-card">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10"></div>
              <Image 
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].title}
                fill
                className="object-cover object-center transition-transform duration-5000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              
              {/* Tour title overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20 bg-black/70 backdrop-blur-sm rounded-full px-5 py-3 text-white border border-white/10 shadow-sm">
                <span className="text-sm font-medium">{testimonials[activeIndex].title}</span>
              </div>
            </div>
            
            {/* Mobile image - shown only on small screens */}
            <div className="block md:hidden w-full h-60 rounded-xl overflow-hidden relative mt-4 shadow-card">
              <Image 
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].title}
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Tour title overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-center border border-white/10">
                <span className="text-sm font-medium">{testimonials[activeIndex].title}</span>
              </div>
            </div>
          </div>
          
          {/* Swipe instruction indicator - only on mobile */}
          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-highlight-primary/10 rounded-full flex items-center justify-center text-highlight-primary animate-pulse">
            <div className="relative w-4 overflow-hidden">
              <ArrowRight size={16} className="animate-bounce-horizontal" />
            </div>
          </div>
          
          {/* Enhanced progress bar */}
          <div className="w-full max-w-lg mx-auto bg-stone-200/50 h-1 rounded-full overflow-hidden mb-4">
            <div 
              ref={progressRef}
              className="h-full bg-highlight-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Testimonial indicator pills */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return
                  
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setIsPaused(true)
                  setProgress(0)
                  
                  // Resume auto-rotation after 5 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 5000)
                  
                  setTimeout(() => {
                    setIsAnimating(false)
                  }, 600)
                }}
                className={cn(
                  "transition-all relative rounded-full",
                  activeIndex === index 
                    ? "w-8 h-3 bg-highlight-primary shadow-sm" 
                    : "w-3 h-3 bg-stone-200 hover:bg-stone-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {activeIndex === index && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-highlight-primary">{index + 1}</span>
                )}
              </button>
            ))}
          </div>
          
          {/* Mobile navigation */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => {
                prevTestimonial()
                setIsPaused(true)
                setTimeout(() => setIsPaused(false), 5000)
              }}
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={() => {
                nextTestimonial()
                setIsPaused(true)
                setTimeout(() => setIsPaused(false), 5000)
              }}
              className="w-10 h-10 rounded-full bg-highlight-primary flex items-center justify-center text-white transition-all shadow-sm hover:shadow-purple-glow"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 