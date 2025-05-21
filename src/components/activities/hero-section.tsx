"use client"

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
import { uploadthingUrls } from '@/data/uploadthing-urls'

export function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setCursorPosition({ x, y })
  }
  
  // Featured destinations
  const featuredDestinations = [
    { name: "Sahara Desert", rating: 4.9, count: 312 },
    { name: "Atlas Mountains", rating: 4.8, count: 207 },
    { name: "Marrakech Medina", rating: 4.7, count: 543 }
  ]

  return (
    <section 
      className="relative w-full bg-sand-gradient py-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={containerRef}
    >
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Visual indicator bar - matches experience tabs styling */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-10 bg-highlight-primary"></div>
          <span className="text-sm font-medium tracking-wide text-highlight-primary">DISCOVER MOROCCO</span>
        </div>
        
        {/* Hero grid layout - 3 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Main heading and intro */}
          <div className="lg:col-span-4 z-10">
            <h1 className="text-[3.5rem] md:text-[4.5rem] font-semibold text-stone-900 tracking-tight leading-[0.95] mb-6">
              Authentic<br />
              <span className="relative">
                Moroccan
                <div className="absolute h-1 bg-highlight-primary/30 bottom-3 left-0 w-full rounded-full"></div>
              </span><br />
              Experiences
            </h1>
            
            <p className="text-stone-600 mb-8 text-lg leading-relaxed">
              Immerse yourself in the magic of Morocco with our handcrafted luxury experiences and private tours.
            </p>
            
            <div className="hidden md:flex items-center gap-4 text-sm mb-10">
              {featuredDestinations.map((dest, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="h-6 w-px bg-stone-200 mx-3"></div>}
                  <div>
                    <div className="text-stone-800 font-medium">{dest.name}</div>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <Star size={12} className="fill-highlight-primary text-highlight-primary" />
                      <span>{dest.rating}</span>
                      <span>({dest.count})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/experiences" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium bg-highlight-primary text-white shadow-sm hover:shadow-glow transition-all">
                <span>Explore experiences</span>
                <ArrowRight size={16} />
              </Link>
              
              <Link href="/about" className="inline-flex items-center justify-center gap-1 px-5 py-3.5 rounded-full text-sm font-medium border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all">
                <span>About us</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
          
          {/* Center column - Floating main image */}
          <div className="lg:col-span-5 relative z-0 h-[450px] md:h-[550px] shadow-premium rounded-premium overflow-hidden group">
            <Image 
              src={uploadthingUrls.merzouga}
              alt="Moroccan desert experience" 
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              style={{
                transform: isHovering ? 
                  `translate(${(cursorPosition.x - 0.5) * -20}px, ${(cursorPosition.y - 0.5) * -20}px)` : 
                  'translate(0, 0)'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Feature badge - Fixed contrast issue */}
            <div className="absolute top-8 left-8 bg-highlight-primary rounded-full px-5 py-2.5 shadow-md flex items-center gap-2 animate-float-slow">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <span className="text-sm font-medium text-white">Featured Experience</span>
            </div>
            
            {/* Price tag */}
            <div className="absolute bottom-8 right-8 bg-stone-900 text-white rounded-full px-5 py-2.5 shadow-md flex items-center gap-2">
              <span className="text-sm font-medium">From $99</span>
            </div>
            
            {/* Add subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60"></div>
          </div>
          
          {/* Right column - Stacked smaller images */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 h-[550px]">
            {/* Upper image */}
            <div className="relative h-[250px] shadow-card rounded-premium overflow-hidden group">
              <Image 
                src={uploadthingUrls.extras.medina}
                alt="Moroccan cultural experience" 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{
                  transform: isHovering ? 
                    `translate(${(cursorPosition.x - 0.5) * -10}px, ${(cursorPosition.y - 0.5) * -10}px)` : 
                    'translate(0, 0)'
                }}
                sizes="(max-width: 1200px) 25vw, 20vw"
              />
              
              {/* Add subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
              
              {/* Add small label */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-white">
                Medina Tour
              </div>
            </div>
            
            {/* Lower image */}
            <div className="relative h-[280px] shadow-card rounded-premium overflow-hidden group">
              <Image 
                src={uploadthingUrls.extras.sunset}
                alt="Moroccan luxury accommodation" 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{
                  transform: isHovering ? 
                    `translate(${(cursorPosition.x - 0.5) * -15}px, ${(cursorPosition.y - 0.5) * -15}px)` : 
                    'translate(0, 0)'
                }}
                sizes="(max-width: 1200px) 25vw, 20vw"
              />
              
              {/* Add subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
              
              {/* Add small label */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-white">
                Sunset Experience
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile featured destinations */}
        <div className="flex md:hidden items-center gap-3 overflow-x-auto pb-2 scrollbar-custom mt-10">
          {featuredDestinations.map((dest, i) => (
            <div key={i} className="flex-shrink-0 bg-white rounded-xl px-4 py-3 border border-stone-200 shadow-sm">
              <div className="text-stone-800 font-medium">{dest.name}</div>
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <Star size={12} className="fill-highlight-primary text-highlight-primary" />
                <span>{dest.rating}</span>
                <span>({dest.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 