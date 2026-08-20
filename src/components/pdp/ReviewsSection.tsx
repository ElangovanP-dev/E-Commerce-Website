'use client'

import { useState } from 'react'
import { Star, ShieldCheck, ThumbsUp, MessageSquare, Check } from 'lucide-react'
import { ProductReview } from '@/types'
import Image from 'next/image'

export function ReviewsSection({ reviews = [] }: { reviews: ProductReview[] }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newRating, setNewRating] = useState(5)
  const [newTitle, setNewTitle] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const reviewList = reviews.length > 0 ? reviews : [
    {
      id: 'r1',
      productId: 'p1',
      userId: 'u1',
      rating: 5,
      title: 'Supreme Craftsmanship & Unmatched Acoustic Clarity',
      comment: 'I was blown away by the noise cancellation performance and structural build quality. The titanium drivers produce extraordinarily rich bass without compromising vocal crispness.',
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString(),
      user: {
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'r2',
      productId: 'p1',
      userId: 'u2',
      rating: 5,
      title: 'Flawless Aesthetic & Extremely Comfortable',
      comment: 'Wore these on a 14-hour international flight. Absolute zero ear fatigue. Battery life easily exceeded 38 hours on a single charge.',
      isVerifiedPurchase: true,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      user: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      },
    },
  ]

  const totalReviews = reviewList.length
  const avgRating = (reviewList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newComment) return
    setSubmitted(true)
    setTimeout(() => {
      setShowReviewForm(false)
      setSubmitted(false)
      setNewTitle('')
      setNewComment('')
    }, 2000)
  }

  return (
    <div className="space-y-8 py-8 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Customer Feedback & Reviews
          </span>
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
            Verified Customer Ratings
          </h3>
        </div>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="py-3 px-5 rounded-2xl bg-card border border-border hover:bg-muted text-foreground font-bold text-xs flex items-center space-x-2 transition-all shrink-0 self-start md:self-auto shadow-sm"
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Write a Verified Review</span>
        </button>
      </div>

      {/* Ratings Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8 rounded-3xl bg-card border border-border">
        {/* Left Score Card */}
        <div className="flex flex-col items-center justify-center text-center p-4 border-b lg:border-b-0 lg:border-r border-border/60 space-y-2">
          <span className="text-5xl font-black font-mono text-foreground">{avgRating}</span>
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs text-muted-fg font-medium">Based on {totalReviews} Verified Buyer Reviews</span>
        </div>

        {/* Rating Breakdown Progress Bars */}
        <div className="lg:col-span-2 space-y-2 justify-center flex flex-col">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviewList.filter((r) => r.rating === stars).length
            const pct = Math.round((count / totalReviews) * 100) || (stars === 5 ? 90 : 10)
            return (
              <div key={stars} className="flex items-center space-x-3 text-xs">
                <span className="w-12 font-mono font-bold text-muted-fg">{stars} Stars</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden border border-border/40">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-10 font-mono text-muted-fg text-right">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Write Review Form Collapsible */}
      {showReviewForm && (
        <form onSubmit={handleReviewSubmit} className="p-6 rounded-3xl bg-card border border-primary/40 space-y-4 shadow-lg">
          <h4 className="font-bold text-sm text-foreground">Share Your Experience</h4>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-muted-fg">Rating:</span>
            <div className="flex items-center space-x-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-muted-fg'}`}
                />
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Review Title (e.g. Exceptional Build Quality)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <textarea
            rows={3}
            placeholder="Write your review comments..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />

          {submitted ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Thank you! Your verified review has been submitted for approval.</span>
            </div>
          ) : (
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-primary text-primary-fg font-bold text-xs hover:opacity-90 shadow-glow"
            >
              Submit Review
            </button>
          )}
        </form>
      )}

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {reviewList.map((review) => (
          <div key={review.id} className="p-6 rounded-3xl bg-card border border-border space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-muted border border-border">
                  <Image
                    src={review.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={review.user?.name || 'Customer'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-foreground">{review.user?.name || 'Verified Buyer'}</h5>
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <h4 className="font-extrabold text-sm text-foreground">{review.title}</h4>
            <p className="text-xs text-muted-fg leading-relaxed">{review.comment}</p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-muted-fg border-t border-border/40">
              <span className="font-mono">{new Date(review.createdAt).toLocaleDateString()}</span>
              <button className="flex items-center space-x-1 hover:text-foreground">
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful (14)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
