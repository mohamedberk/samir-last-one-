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
    image: "https://utfs.io/f/IfdYuWUiRNceP5ZU8tdLMvxHU7SwKuRhNBf14lqstVZinJPF",
    title: "Desert Sunset Tour",
    rating: 5,
    quote: "Our Moroccan adventure was nothing short of magical. The desert sunset was breathtaking, and our guide's knowledge of the local culture made this trip unforgettable.",
    date: "October 2023"
  },
  {
    id: 2,
    name: "James Rodriguez",
    location: "Barcelona, Spain",
    image: "https://utfs.io/f/IfdYuWUiRNceR9xqpD0172FiWYpdq3mHJKAlBbSZIUrVfLn",
    title: "Marrakech Food Tour",
    rating: 5,
    quote: "The authentic flavors we experienced were incredible. From hidden gem restaurants to vibrant markets, this food tour revealed the true essence of Moroccan cuisine.",
    date: "September 2023"
  },
  {
    id: 3,
    name: "Emma Chen",
    location: "Toronto, Canada",
    image: "https://utfs.io/f/IfdYuWUiRNcezWCPQCXJEAfw09hVy87BOud3CrbqaveQT2t",
    title: "Atlas Mountains Trek",
    rating: 5,
    quote: "The Atlas Mountains trek was challenging but rewarding. Our guide was knowledgeable about the terrain and ensured our safety while sharing fascinating insights about Berber culture.",
    date: "November 2023"
  },
  {
    id: 4,
    name: "Michael Okafor",
    location: "Lagos, Nigeria",
    image: "https://utfs.io/f/IfdYuWUiRNcenZW0lSeZC7BqZOmFJUadlQroR98g64zxWbuY",
    title: "Private Desert Excursion",
    rating: 5,
    quote: "The attention to detail on our private desert excursion was impeccable. From the luxury camp to the camel ride at sunrise, every moment was perfectly curated.",
    date: "August 2023"
  },
  {
    id: 5,
    name: "Sophie Laurent",
    location: "Paris, France",
    image: "https://utfs.io/f/IfdYuWUiRNce5C8s1rLFX9CuOBemqTiontrhPc1xV6ayLbjz",
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
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const autoPlayInterval = 5000 // 5 seconds between transitions
  
  // Navigate to previous testimonial
  const prevTestimonial = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }, [isAnimating])
  
  // Navigate to next testimonial
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }, [isAnimating])
  
  // Auto-rotation effect
  useEffect(() => {
    const startAutoPlay = () => {
      // Clear any existing timeout
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
      
      autoPlayRef.current = setTimeout(() => {
        if (!isPaused) {
          nextTestimonial()
        }
        // Always restart the timer
        startAutoPlay()
      }, autoPlayInterval)
    }
    
    startAutoPlay()
    
    // Clean up on unmount
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [isPaused, nextTestimonial])
  
  // Reset the autoplay animation when resuming
  useEffect(() => {
    if (!isPaused) {
      // Restart the animation by forcing a reflow
      const elements = document.querySelectorAll('.progress-bar')
      elements.forEach(el => {
        el.classList.remove('animate-progress')
        // Force reflow - Fix TypeScript error by using type assertion
        void (el as HTMLElement).offsetWidth
        el.classList.add('animate-progress')
      })
    }
  }, [isPaused])
  
  return (
    <section 
      className="w-full bg-sand-gradient relative py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8" ref={containerRef}>
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
                  // Resume auto-rotation after 10 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 10000)
                }}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-all"
                aria-label="Previous testimonial"
                disabled={isAnimating}
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => {
                  nextTestimonial()
                  setIsPaused(true)
                  // Resume auto-rotation after 10 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 10000)
                }}
                className="w-10 h-10 rounded-full bg-highlight-primary shadow-sm flex items-center justify-center text-white transition-all hover:shadow-glow"
                aria-label="Next testimonial"
                disabled={isAnimating}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Unique testimonial layout */}
        <div className="relative overflow-hidden">
          {/* Main featured testimonial */}
          <div 
            className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 mb-8 transition-all duration-500 ease-in-out"
            style={{
              transform: isAnimating ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {/* Left side - Quote */}
            <div className="md:col-span-7 bg-white p-10 rounded-xl md:rounded-l-xl md:rounded-r-none border border-stone-200 relative shadow-card">
              {/* Large quote mark in background */}
              <div className="absolute top-6 left-8 opacity-5">
                <Quote size={120} />
              </div>
              
              {/* Quote content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-highlight-primary text-highlight-primary" />
                  ))}
                </div>
                
                <p className="text-2xl font-medium text-stone-900 mb-6 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-stone-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-stone-500">{testimonials[activeIndex].location}</p>
                  </div>
                  <span className="text-sm text-stone-400">{testimonials[activeIndex].date}</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="hidden md:block md:col-span-5 rounded-r-xl overflow-hidden relative h-auto shadow-card">
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <Image 
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              
              {/* Tour title overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20 bg-black/70 backdrop-blur-sm rounded-full px-5 py-3 text-white">
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Tour title overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-center">
                <span className="text-sm font-medium">{testimonials[activeIndex].title}</span>
              </div>
            </div>
          </div>
          
          {/* Testimonial indicator pills with progress animation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return
                  
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setIsPaused(true)
                  
                  // Resume auto-rotation after 10 seconds of inactivity
                  setTimeout(() => setIsPaused(false), 10000)
                  
                  setTimeout(() => {
                    setIsAnimating(false)
                  }, 500)
                }}
                className={cn(
                  "h-2 rounded-full transition-all relative overflow-hidden",
                  activeIndex === index 
                    ? "w-10 bg-highlight-primary" 
                    : "w-2 bg-stone-200 hover:bg-stone-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {activeIndex === index && !isPaused && (
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-white/30 rounded-full progress-bar animate-progress"
                    style={{
                      animationDuration: `${autoPlayInterval}ms`,
                      width: "100%",
                      transformOrigin: "left"
                    }}
                  />
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
                // Resume auto-rotation after 10 seconds of inactivity
                setTimeout(() => setIsPaused(false), 10000)
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
                // Resume auto-rotation after 10 seconds of inactivity
                setTimeout(() => setIsPaused(false), 10000)
              }}
              className="w-10 h-10 rounded-full bg-highlight-primary flex items-center justify-center text-white transition-all shadow-sm hover:shadow-glow"
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