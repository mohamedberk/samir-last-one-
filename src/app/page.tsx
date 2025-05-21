import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { NewHeroSection } from '@/components/activities/new-hero-section'
import { TestimonialsSection } from '@/components/activities/testimonials-section'
import { Footer } from '@/components/activities/footer'

const ExperienceTabs = dynamic(
  () => import('@/components/activities/experience-tabs').then(mod => mod.ExperienceTabs),
  { loading: () => (
    <div className="w-full bg-sand-gradient relative py-16">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Skeleton header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-highlight-primary opacity-40"></div>
            <div className="h-4 w-20 bg-highlight-primary/10 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-10 w-72 bg-stone-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton tabs */}
        <div className="mb-10">
          <div className="h-12 w-full max-w-xl bg-white/80 rounded-full animate-pulse shadow-sm"></div>
        </div>

        {/* Skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="premium-card animate-pulse">
              <div className="h-[280px] bg-stone-100 rounded-t-premium"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-8 w-24 bg-stone-100 rounded-full"></div>
                  <div className="h-6 w-28 bg-stone-100 rounded-full"></div>
                </div>
                <div className="h-7 w-full bg-stone-100 rounded-full mb-2"></div>
                <div className="h-4 w-full bg-stone-100 rounded-full mb-2"></div>
                <div className="h-4 w-3/4 bg-stone-100 rounded-full mb-5"></div>
                <div className="mt-auto pt-4 border-t border-stone-100">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-40 bg-stone-100 rounded-full"></div>
                    <div className="w-10 h-10 rounded-full bg-stone-100"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
)

export default function Home() {
  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      <div className="flex flex-col w-full gap-0">
        
        {/* Hero Section */}
        <NewHeroSection />
        
        {/* Experience Tabs Section - Updated with new premium design */}
        <Suspense fallback={
          <div className="w-full bg-sand-gradient relative py-16">
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
              {/* Skeleton header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-10 bg-highlight-primary opacity-40"></div>
                  <div className="h-4 w-20 bg-highlight-primary/10 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-10 w-72 bg-stone-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Skeleton tabs */}
              <div className="mb-10">
                <div className="h-12 w-full max-w-xl bg-white/80 rounded-full animate-pulse shadow-sm"></div>
              </div>

              {/* Skeleton cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="premium-card animate-pulse">
                    <div className="h-[280px] bg-stone-100 rounded-t-premium"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-8 w-24 bg-stone-100 rounded-full"></div>
                        <div className="h-6 w-28 bg-stone-100 rounded-full"></div>
                      </div>
                      <div className="h-7 w-full bg-stone-100 rounded-full mb-2"></div>
                      <div className="h-4 w-full bg-stone-100 rounded-full mb-2"></div>
                      <div className="h-4 w-3/4 bg-stone-100 rounded-full mb-5"></div>
                      <div className="mt-auto pt-4 border-t border-stone-100">
                        <div className="flex justify-between items-center">
                          <div className="h-4 w-40 bg-stone-100 rounded-full"></div>
                          <div className="w-10 h-10 rounded-full bg-stone-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <ExperienceTabs />
        </Suspense>

        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Footer Section */}
        <Footer />
      </div>
    </main>
  )
} 