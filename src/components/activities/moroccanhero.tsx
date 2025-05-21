"use client";

import React, { useEffect, useState } from 'react';
import { uploadthingUrls } from '@/data/uploadthing-urls';

export function MoroccoHeroSection() {
  // Get the Morocco desert image from uploadthing-urls
  const { moroccoDesertImage } = uploadthingUrls;
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat overflow-hidden" style={{ 
      backgroundImage: `url(${moroccoDesertImage})`,
      backgroundPosition: 'center top',
    }}>
      {/* Parallax effect on background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url(${moroccoDesertImage})`,
          backgroundPosition: 'center top',
          transform: `translateY(${scrollPosition * 0.15}px)`
        }}
      ></div>
      
      {/* Gradient overlay to enhance image contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOGY4ZjgiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {/* Clean cutoff at the bottom - no gradient */}
       <div className="absolute bottom-0 left-0 right-0 h-24 bg-sand-50 z-10"></div>
       
       {/* Added texture consistent with the section below */}
       <div className="absolute bottom-0 left-0 right-0 h-24 bg-noise opacity-[0.04] z-10"></div>
      
      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-20">
        <div className="text-white text-4xl font-serif tracking-[0.2em] opacity-95 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          TRAVEL
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-10">
            <a href="#" className="text-white hover:text-amber-300 transition-all duration-300 relative group text-lg">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-white hover:text-amber-300 transition-all duration-300 relative group text-lg">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <button className="text-white hover:text-amber-300 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-10 w-40 h-40 border border-white/20 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 border border-amber-200/10 rounded-full opacity-20"></div>
      
      {/* Hero content - positioned to stay in the top half */}
      <div className="absolute inset-x-0 top-[15%] bottom-auto flex flex-col justify-start px-8 md:px-20 z-20">
        <div className="max-w-2xl animate-[fadeIn_1.5s_ease-out_forwards]">
          <h1 className="text-white text-6xl md:text-8xl font-serif mb-8 tracking-wide leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            <div className="overflow-hidden">
              <span className="inline-block animate-[slideUp_0.8s_ease-out_forwards]">Discover</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block animate-[slideUp_0.8s_0.3s_ease-out_forwards] opacity-0">Morocco</span>
            </div>
          </h1>
          
          <div className="overflow-hidden mb-1">
            <p className="text-white text-xl md:text-2xl font-light animate-[slideUp_0.8s_0.5s_ease-out_forwards] opacity-0">
              Experience the adventure of Morocco
            </p>
          </div>
          <div className="overflow-hidden mb-12">
            <p className="text-white text-xl md:text-2xl font-light animate-[slideUp_0.8s_0.7s_ease-out_forwards] opacity-0">
              Experience the adventure of Morocco
            </p>
          </div>
          
          <div className="overflow-hidden">
            <a 
              href="#" 
              className="inline-block px-10 py-4 bg-amber-500 text-white text-xl font-medium rounded-md shadow-xl hover:bg-amber-600 transition-all duration-300 animate-[slideUp_0.8s_0.9s_ease-out_forwards] opacity-0 hover:translate-y-[-3px] hover:shadow-[0_20px_80px_-10px_rgba(251,191,36,0.5)]"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
      
      {/* Add custom keyframes for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
} 