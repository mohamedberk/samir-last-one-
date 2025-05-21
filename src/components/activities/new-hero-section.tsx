"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Users, Calendar, Clock, Star, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { uploadthingUrls } from '@/data/uploadthing-urls'

export function NewHeroSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Effect to trigger animation when component mounts
  useEffect(() => {
    setIsInView(true)
  }, [])
  
  // Featured tours data with purple theme colors
  const featuredTours = [
    { 
      id: 1, 
      title: "Sahara Desert Adventure",
      location: "Merzouga", 
      duration: "3 Days", 
      group: "Private Tour",
      season: "Sep-May",
      rating: 4.9,
      reviews: 128,
      image: uploadthingUrls.merzouga,
      color: "from-purple-500/20 to-indigo-500/20" 
    },
    { 
      id: 2, 
      title: "Atlas Mountains Expedition",
      location: "Imlil Valley", 
      duration: "1 Day", 
      group: "Private Tour",
      season: "All Year",
      rating: 4.8,
      reviews: 94,
      image: uploadthingUrls.extras.hiking,
      color: "from-violet-500/20 to-purple-500/20" 
    },
    { 
      id: 3, 
      title: "Marrakech Medina Discovery",
      location: "Marrakech", 
      duration: "Half Day", 
      group: "Private Tour",
      season: "All Year",
      rating: 4.9,
      reviews: 156,
      image: uploadthingUrls.extras.medina,
      color: "from-indigo-500/20 to-blue-500/20" 
    }
  ]

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-zinc-50 relative py-16 overflow-hidden" ref={containerRef}>
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500 to-purple-500 transform -rotate-45 origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-px bg-gradient-to-l from-transparent via-indigo-400 to-indigo-400 transform rotate-45 origin-bottom-left"></div>
      
      {/* Purple orb glow effects */}
      <div className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-[10%] w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Horizontal layout instead of vertical */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-center gap-10 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-purple-500"></div>
            <span className="text-sm font-medium tracking-wide text-purple-600">PRIVATE MOROCCAN TOURS</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
            Unforgettable Experiences <span className="text-purple-600">Tailored Just For You</span>
          </h1>
          
          <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          
          <Link href="#activities" className="group inline-flex items-center justify-center gap-1 px-5 py-3 rounded-full text-sm font-medium border border-slate-200 hover:border-purple-200 hover:bg-purple-50 text-slate-700 hover:text-purple-600 transition-all">
            <span>View all tours</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
        
        {/* Interactive cards carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left section - Main content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Experience the magic of Morocco with our exclusive private tours. 
                From the vibrant medinas to the serene desert landscapes, every journey 
                is customized with your own dedicated guide and luxury transportation.
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-premium p-4 border border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all">
                  <div className="text-3xl font-semibold text-purple-600 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Private Tours</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-premium p-4 border border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all">
                  <div className="text-3xl font-semibold text-purple-600 mb-1">4.9</div>
                  <div className="text-sm text-slate-600">Customer Rating</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-premium p-4 border border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all">
                  <div className="text-3xl font-semibold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-slate-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Tour selector */}
            <div className="hidden lg:block">
              <div className="mb-5">
                <h3 className="text-slate-900 text-xl font-medium mb-2">Featured Experiences</h3>
                <p className="text-slate-600 text-sm">Select a tour to explore details</p>
              </div>
              
              <div className="space-y-3">
                {featuredTours.map((tour, index) => (
                  <button
                    key={tour.id}
                    onClick={() => setActiveCard(index)}
                    className={`w-full text-left p-4 rounded-premium border transition-all ${
                      activeCard === index 
                        ? "border-purple-400 bg-purple-50 shadow-md" 
                        : "border-slate-200 bg-white hover:border-purple-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-slate-900">{tour.title}</span>
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                          <Star size={12} className="fill-purple-500 text-purple-500" />
                          <span>{tour.rating}</span>
                          <span>({tour.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      {activeCard === index && (
                        <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Center section - Main showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Main card display */}
            <div className="relative h-[450px] md:h-[520px] mb-4 rounded-premium overflow-hidden shadow-2xl group">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image 
                  src={featuredTours[activeCard].image}
                  alt={featuredTours[activeCard].title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent`}></div>
                
                {/* Background glow effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.7 }}
                  className={`absolute inset-0 bg-gradient-to-br ${featuredTours[activeCard].color} mix-blend-overlay`}
                ></motion.div>
              </motion.div>
              
              {/* Card content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  key={`content-${activeCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-3 py-1 rounded-full bg-purple-500 text-white text-xs uppercase tracking-wider font-medium">Featured</div>
                    <div className="flex items-center gap-1 text-white">
                      <Star size={16} className="fill-purple-400 text-purple-400" />
                      <span>{featuredTours[activeCard].rating}</span>
                      <span className="text-white/70">({featuredTours[activeCard].reviews})</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-semibold text-white mb-4">{featuredTours[activeCard].title}</h2>
                  
                  {/* Info chips */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <MapPin size={14} />
                      <span>{featuredTours[activeCard].location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <Clock size={14} />
                      <span>{featuredTours[activeCard].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <Users size={14} />
                      <span>{featuredTours[activeCard].group}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <Calendar size={14} />
                      <span>{featuredTours[activeCard].season}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Link 
                    href={`/activities/${featuredTours[activeCard].id}?type=private`}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-purple-600 text-white shadow-lg hover:shadow-purple-500/30 transition-all hover:bg-purple-700"
                  >
                    <span>Book this experience</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </div>
            </div>
            
            {/* Mobile tour selector */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-custom">
              {featuredTours.map((tour, index) => (
                <button
                  key={tour.id}
                  onClick={() => setActiveCard(index)}
                  className={`flex-shrink-0 p-3 rounded-full transition-all ${
                    activeCard === index 
                      ? "bg-purple-600 text-white" 
                      : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  <span className="whitespace-nowrap text-sm font-medium">{tour.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 