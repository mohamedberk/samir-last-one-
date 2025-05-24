"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Instagram, Twitter, Facebook, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const [emailInput, setEmailInput] = useState('')
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailInput('')
  }
  
  const currentYear = new Date().getFullYear()

  return (
    <footer id="footer" className="w-full bg-sand-gradient relative pt-16 pb-8 overflow-hidden border-t border-stone-200">
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 mb-8">
          {/* Brand and newsletter - Left column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <span className="font-semibold text-sm">VIP</span>
              </div>
              <h3 className="font-semibold text-stone-900">Marrakech Trips</h3>
            </div>
            
            <p className="text-stone-600 mb-4 text-sm leading-relaxed">
              Immerse yourself in the magic of Morocco with our handcrafted luxury experiences.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email for updates" 
                className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2 text-sm text-stone-800 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 focus:border-highlight-primary/30"
                required
              />
              <button 
                type="submit"
                className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-highlight-primary text-white shadow-sm hover:shadow-glow transition-all"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
          
          {/* Quick Links - Middle columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-stone-900 mb-3">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/activities" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    All Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=day-trips" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    Day Trips
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=desert" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    Desert Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=unique" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    Unique Adventures
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-stone-900 mb-3">Information</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/booking-policy" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    Booking Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-stone-600 hover:text-stone-900 transition-colors text-xs">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact and Social - Right column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-medium text-stone-900 mb-3">Contact</h4>
            <div className="text-stone-600 text-xs mb-3">
              <p>Jemaa el-Fnaa, 40000 Marrakech</p>
              <p className="mt-1">
                <a href="tel:+212612345678" className="hover:text-stone-900 transition-colors">
                  +212 123 555 555
                </a>
              </p>
              <p className="mt-1">
                <a href="mailto:info@marrakechtrips.com" className="hover:text-stone-900 transition-colors">
                  info@marrakechtrips.com
                </a>
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Link href="https://instagram.com" 
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-white/60 transition-colors bg-white/30 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </Link>
              <Link href="https://twitter.com" 
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-white/60 transition-colors bg-white/30 backdrop-blur-sm"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </Link>
              <Link href="https://facebook.com" 
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-white/60 transition-colors bg-white/30 backdrop-blur-sm"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom section with badges and copyright */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 pt-4 border-t border-stone-200/50 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 border border-stone-200 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-highlight-primary flex items-center justify-center">
                <span className="text-white text-[8px] font-medium">TM</span>
              </div>
              <span className="text-[10px] text-stone-700">Verified Local Tours</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 border border-stone-200 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-highlight-primary flex items-center justify-center">
                <span className="text-white text-[8px] font-medium">24</span>
              </div>
              <span className="text-[10px] text-stone-700">24/7 Support</span>
            </div>
          </div>
          
          <div className="text-stone-500 text-[10px] text-center md:text-right">
            <p>© {currentYear} VIP Marrakech Trips. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 