import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ConfirmationLoading() {
  return (
    <main className="bg-gradient-to-b from-stone-50 to-sand-100 min-h-screen">
      {/* Fixed Header */}
      <div className="sticky top-0 left-0 right-0 z-30 bg-white shadow-md border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-all shadow-sm"
              >
                <ArrowLeft size={18} className="text-stone-700 group-hover:text-highlight-primary transition-colors" />
                <span className="text-sm font-medium text-stone-700 group-hover:text-highlight-primary transition-colors">Return Home</span>
              </Link>
              <h1 className="text-xl sm:text-2xl font-semibold text-stone-900">Booking Confirmation</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full shadow-sm border border-green-100">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-700 hidden sm:inline">Processing Booking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Shimmer effect for loading state */}
          <div className="relative bg-white rounded-premium shadow-premium border border-stone-200 overflow-hidden max-w-xl w-full mx-auto transform hover:shadow-premium-hover transition-all duration-300 p-12">
            {/* Colorful top border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-highlight-primary to-pink-500"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-6 animate-pulse">
                <Loader2 size={30} className="text-highlight-primary animate-spin" />
              </div>
              
              <div className="h-8 w-64 bg-stone-100 rounded-lg animate-pulse mb-6"></div>
              
              <div className="space-y-3 w-full max-w-md">
                <div className="h-4 w-full bg-stone-100 rounded-full animate-pulse"></div>
                <div className="h-4 w-5/6 bg-stone-100 rounded-full animate-pulse"></div>
                <div className="h-4 w-4/6 bg-stone-100 rounded-full animate-pulse"></div>
              </div>
              
              <div className="mt-8 w-full flex justify-center">
                <div className="h-10 w-48 bg-stone-100 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-stone-600">
            Processing your booking confirmation...
          </div>
        </div>
      </div>
    </main>
  )
} 