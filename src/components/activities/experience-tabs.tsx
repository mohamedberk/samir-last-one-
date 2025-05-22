"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { allActivities } from '@/data/activities'
import { Activity } from '@/types/activity'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, ArrowRight, Heart, Clock, Users, User, Sparkles, RefreshCw, ChevronRight } from 'lucide-react'

// Category configuration
const categories = [
  {
    name: "All",
    key: "all",
  },
  {
    name: "Day Trips",
    key: "day-trips",
    activities: ['essaouira', 'ouarzazate', 'imlil', 'ouzoud', 'ourika', 'casablanca'],
  },
  {
    name: "Multi-Day",
    key: "multi-day",
    activities: ['toubkal-trek', 'imperial-cities', 'merzouga'],
  },
  {
    name: "Desert",
    key: "desert",
    activities: ['chez-ali', 'agafay-night'],
  },
  {
    name: "Unique",
    key: "unique",
    activities: ['hot-air-balloon', 'agafay-desert'],
  },
];

interface ExperienceTabsProps {
  className?: string;
}

export function ExperienceTabs({ className }: ExperienceTabsProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [favoriteActivities, setFavoriteActivities] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [tourType, setTourType] = useState<'private' | 'group'>('private')
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Load saved tour type preference on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTourType = localStorage.getItem('preferredTourType')
      if (savedTourType === 'private' || savedTourType === 'group') {
        setTourType(savedTourType)
      }
    }
  }, [])

  // Get filtered activities based on active category
  const filteredActivities = useMemo(() => {
    if (activeCategory === "all") {
      return allActivities.slice(0, 6); // Limit to 6 items for all category
    }
    
    const categoryConfig = categories.find(cat => cat.key === activeCategory);
    if (!categoryConfig || !categoryConfig.activities) return allActivities.slice(0, 6);
    
    return allActivities.filter(activity => 
      categoryConfig.activities.includes(activity.slug)
    );
  }, [activeCategory]);

  // Handle activity click - Go to activity detail page
  const handleActivityClick = (activityId: number) => {
    // Ensure we save the current tour type preference before navigating
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredTourType', tourType)
    }
    router.push(`/activities/${activityId}?type=${tourType}`)
  }
  
  // Handle booking button click - Go directly to booking page
  const handleBooking = (e: React.MouseEvent, activityId: number) => {
    e.stopPropagation();
    // Ensure we save the current tour type preference before navigating
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredTourType', tourType)
    }
    router.push(`/booking/${activityId}?type=${tourType}&adults=2&children=0`)
  }

  // Toggle favorite
  const toggleFavorite = (e: React.MouseEvent, activityId: number) => {
    e.stopPropagation();
    setFavoriteActivities(prev => 
      prev.includes(String(activityId)) 
        ? prev.filter(id => id !== String(activityId)) 
        : [...prev, String(activityId)]
    );
  }

  // Toggle tour type and save preference
  const toggleTourType = () => {
    const newType = tourType === 'private' ? 'group' : 'private'
    setTourType(newType)
    // Save preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredTourType', newType)
    }
  }

  return (
    <section className="w-full bg-sand-gradient relative py-16 border-t border-sand-200" id="activities">
      {/* Subtle noise background */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8" ref={containerRef}>
        {/* Section heading with enhanced styling */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-highlight-primary"></div>
            <span className="text-sm font-medium tracking-wide text-highlight-primary">DISCOVER</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight">
                {tourType === 'private' ? 'Exclusive Private Tours' : 'Popular Group Tours'}
              </h2>
              <p className="mt-2 text-stone-600 max-w-lg">
                {tourType === 'private' 
                  ? 'Luxury private experiences tailored just for you. Enjoy personalized service with your own dedicated guide and vehicle.'
                  : 'Join other travelers and discover Morocco\'s highlights together. Our group tours offer great value and social experiences.'}
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={toggleTourType} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-stone-200 bg-white hover:bg-stone-50 transition-all shadow-sm text-stone-900"
              >
                <span>Switch to {tourType === 'private' ? 'Group' : 'Private'} Tours</span>
                <RefreshCw size={14} className="text-highlight-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Category Navigation */}
        <div className="flex items-center mb-10 overflow-x-auto pb-2 scrollbar-custom">
          <div className="premium-tabs backdrop-blur-md">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={cn(
                  "premium-tab",
                  activeCategory === category.key 
                    ? "premium-tab-active" 
                    : "premium-tab-inactive"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Activity Cards Grid with subtle animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id}
              className="premium-card group transform transition-all duration-500 hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(activity.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Media - No longer navigates on click */}
              <div className="premium-card-media h-[280px]">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="premium-card-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Favorite button with enhanced effects */}
                <button 
                  onClick={(e) => toggleFavorite(e, activity.id)}
                  className="premium-card-favorite"
                  aria-label={favoriteActivities.includes(String(activity.id)) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    size={18} 
                    className={favoriteActivities.includes(String(activity.id)) 
                      ? "fill-highlight-primary text-highlight-primary" 
                      : "text-stone-700"
                    } 
                  />
                </button>
                
                {/* Enhanced rating badge */}
                {activity.isBestSeller && (
                  <div className="premium-card-badge">
                    <Star size={14} className="fill-highlight-primary text-highlight-primary" />
                    <span className="text-xs font-semibold text-stone-900 tracking-wide">4.9</span>
                  </div>
                )}
              </div>
              
              {/* Enhanced Card Content - No longer navigates on click */}
              <div className="p-6 pt-5 pb-0 flex flex-col">
                <div className="flex items-center gap-3 mb-3 justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
                    <Clock size={12} />
                    <span>{activity.duration}</span>
                  </div>
                  
                  {/* Moved PRIVATE/GROUP badge to the right */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-white text-xs font-medium">
                    {tourType === 'private' ? (
                      <>
                        <User size={12} />
                        <span>PRIVATE</span>
                      </>
                    ) : (
                      <>
                        <Users size={12} />
                        <span>GROUP</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-stone-900 text-lg truncate max-w-[65%]">{activity.title.split(' ').slice(0, 3).join(' ')}</h3>
                  
                  {/* Now this is the only button that navigates to activity detail */}
                  <button 
                    onClick={() => handleActivityClick(activity.id)}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-highlight-primary/10 text-highlight-primary border border-highlight-primary/20 shadow-md hover:shadow-glow hover:bg-highlight-primary/15 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>View details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                {/* Expanded description - giving copy more space */}
                <p className="text-stone-600 mb-5 line-clamp-3 text-sm">{activity.description}</p>
              </div>
              
              {/* Redesigned Card Pricing Section - More compact and cleaner */}
              <div className="p-5 mx-4 mb-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-sm text-stone-600 font-medium">From</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-stone-900">${tourType === 'private' ? activity.options.private.price : activity.options.group.price}</div>
                      <span className="text-sm text-stone-600">per adult</span>
                    </div>
                  </div>
                  
                  {/* Direct booking button - now goes straight to booking page */}
                  <button 
                    onClick={(e) => handleBooking(e, activity.id)}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-black text-white shadow-sm hover:shadow-md hover:bg-stone-800 transition-all"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tour Type Toggle - Enhanced Mobile */}
        <div className="mt-10 flex md:hidden items-center justify-center">
          <button onClick={toggleTourType} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-black text-white shadow-sm">
            <span>Switch to {tourType === 'private' ? 'Group' : 'Private'} Tours</span>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
