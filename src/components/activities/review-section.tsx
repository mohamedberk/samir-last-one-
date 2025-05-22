"use client"

import { useState } from 'react'
import { Star, Check, AlertCircle, ChevronDown, ChevronUp, PenSquare, X } from 'lucide-react'
import { Review } from '@/types/activity'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

interface ReviewSectionProps {
  activityId: number
  reviews: Review[]
  onReviewAdded: () => void
  rating: number
  totalReviews: number
  showForm?: boolean
  onClose: () => void
}

export function ReviewSection({ 
  activityId, 
  reviews, 
  onReviewAdded,
  rating: activityRating,
  totalReviews,
  showForm = false,
  onClose
}: ReviewSectionProps) {
  const [userRating, setUserRating] = useState(5)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Calculate rating distribution
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }

  // Add this helper to calculate percentage
  const calculatePercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!comment.trim() || !userName.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      const reviewData = {
        activityId,
        userName: userName.trim(),
        rating: userRating,
        comment: comment.trim(),
        date: serverTimestamp(),
      }

      if (!db) {
        console.error('Firebase database is not initialized')
        toast.error('Failed to submit review. Please try again.')
        return
      }

      await addDoc(collection(db as Firestore, 'reviews'), reviewData)
      
      toast.success('Review submitted successfully!')
      setComment('')
      setUserName('')
      setUserRating(5)
      onReviewAdded()
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Rating Box */}
      {!showForm && (
        <div className="rounded-2xl border border-stone-700 bg-stone-900/50 backdrop-blur-sm p-6 shadow-card">
          <div className="flex gap-8">
            {/* Left side - Rating number and stars */}
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-white mb-2">
                {activityRating.toFixed(1)}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(activityRating)
                        ? 'text-highlight-primary fill-highlight-primary'
                        : 'text-stone-600'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-stone-400 mt-1">
                {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
              </div>
            </div>

            {/* Right side - Distribution bars */}
            <div className="flex-1">
              <div className="space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-8">
                      <span className="text-sm text-stone-400">{stars}</span>
                      <Star className="w-3 h-3 text-highlight-primary fill-highlight-primary" />
                    </div>
                    <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-highlight-primary rounded-full transition-all duration-500"
                        style={{ 
                          width: `${calculatePercentage(ratingDistribution[stars as keyof typeof ratingDistribution])}%` 
                        }}
                      />
                    </div>
                    <div className="w-6 text-right">
                      <span className="text-xs text-stone-400">
                        {ratingDistribution[stars as keyof typeof ratingDistribution]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 p-1.5 rounded-full 
                     bg-red-500/10 hover:bg-red-500/20 
                     transition-colors duration-200
                     border border-red-500/20 group z-10"
          >
            <X className="w-4 h-4 text-red-400 group-hover:text-red-300" />
          </button>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-stone-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-700 
                         text-white placeholder-stone-400 focus:outline-none focus:ring-2 
                         focus:ring-highlight-primary focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setUserRating(rating)}
                    className="p-2 rounded-lg transition-colors duration-200"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= userRating
                          ? 'text-highlight-primary fill-highlight-primary'
                          : 'text-stone-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-stone-300 mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-700 
                         text-white placeholder-stone-400 focus:outline-none focus:ring-2 
                         focus:ring-highlight-primary focus:border-transparent"
                placeholder="Share your experience..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-colors duration-200
                ${isSubmitting 
                  ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                  : 'bg-highlight-primary hover:bg-highlight-secondary text-white'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
} 