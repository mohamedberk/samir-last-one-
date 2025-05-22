"use client"

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronRight, Star, Sparkles, MapPin } from 'lucide-react'
import Link from 'next/link'
import { uploadthingUrls } from '@/data/uploadthing-urls'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Featured destinations
  const featuredDestinations = [
    { name: "Sahara Desert", rating: 4.9, count: 312 },
    { name: "Atlas Mountains", rating: 4.8, count: 207 },
    { name: "Marrakech Medina", rating: 4.7, count: 543 }
  ]

  return (
    <section 
      className="relative w-full bg-sand-gradient py-16 overflow-hidden"
      ref={containerRef}
    >
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        
        {/* Hero grid layout - balanced columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Main heading and intro - Now with premium card styling */}
          <div className="lg:col-span-4 z-10">
            <div className="premium-card h-[550px] overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-6 rounded-full bg-highlight-primary flex items-center justify-center">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-highlight-primary">Premium Experiences</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight mb-6">
                    Authentic Moroccan Experiences
                  </h1>
                  
                  <p className="text-stone-600 mb-8 text-base leading-relaxed">
                    Immerse yourself in the magic of Morocco with our handcrafted luxury experiences and private tours.
                  </p>
                  
                  {/* Destination cards using the premium card style */}
                  <div className="space-y-3">
                    {featuredDestinations.map((dest, i) => (
                      <div key={i} className="p-3 rounded-premium bg-stone-50 border border-stone-200 hover:border-highlight-primary/30 hover:shadow-subtle transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-highlight-primary" />
                          <span className="font-medium text-stone-800">{dest.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-stone-500">
                          <Star size={12} className="fill-highlight-primary text-highlight-primary" />
                          <span>{dest.rating}</span>
                          <span className="text-stone-400">({dest.count})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-8">
                  <a 
                    href="#activities" 
                    className="btn-purple flex-1 justify-center"
                  >
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </a>
                  
                  <a 
                    href="#footer" 
                    className="btn-purple-outline flex-1 justify-center"
                  >
                    <span>About us</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Feature badge - Fixed contrast issue */}
            <div className="absolute top-8 left-8 bg-highlight-primary rounded-full px-5 py-2.5 shadow-md flex items-center gap-2 animate-float-slow">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <span className="text-sm font-medium text-white">Featured Experience</span>
            </div>
            
            {/* Price tag */}
            <div className="absolute bottom-8 right-8 bg-stone-900 text-white rounded-full px-5 py-2.5 shadow-md flex items-center gap-2">
              <span className="text-sm font-medium">From 99$</span>
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