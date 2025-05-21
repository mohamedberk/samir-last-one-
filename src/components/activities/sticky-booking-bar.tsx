import { Activity } from "@/types/activity"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Users, Shield } from "lucide-react"

interface StickyBookingBarProps {
  price: number
  tourType: 'group' | 'private'
  onBookNow: () => void
  isLoading: boolean
  onTourTypeChange: (type: 'group' | 'private') => void
  activity: Activity
  onScrollToBooking: () => void
  selectedMenu?: 'tagine' | 'mechoui'
  onMenuChange?: (menu: 'tagine' | 'mechoui') => void
}

export function StickyBookingBar({ 
  price, 
  tourType,
  onBookNow,
  isLoading,
  onTourTypeChange,
  activity,
  onScrollToBooking,
  selectedMenu = 'tagine',
  onMenuChange
}: StickyBookingBarProps) {
  const isChezAli = activity.slug === 'chez-ali'

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 py-2 px-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3">
          {/* Price and Tour Type */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-white">
                {isChezAli ? '€' : '$'}{price}
              </span>
              <span className="text-xs text-gray-400 ml-1">per person</span>
            </div>

            {!isChezAli && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onTourTypeChange('group')}
                  className={cn(
                    "px-2 py-1 rounded-lg flex items-center gap-1 text-xs transition-colors",
                    tourType === 'group'
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Group</span>
                </button>
                <button
                  onClick={() => onTourTypeChange('private')}
                  className={cn(
                    "px-2 py-1 rounded-lg flex items-center gap-1 text-xs transition-colors",
                    tourType === 'private'
                      ? "bg-orange-500/20 text-orange-400"
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Private</span>
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <button
            onClick={onBookNow}
            disabled={isLoading}
            className={cn(
              "px-4 py-1.5 rounded-lg font-medium text-sm text-white transition-colors",
              isChezAli
                ? "bg-gradient-to-r from-orange-500 to-rose-500"
                : tourType === 'private'
                  ? "bg-gradient-to-r from-orange-500 to-rose-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500",
              "disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              'Book Now'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
} 