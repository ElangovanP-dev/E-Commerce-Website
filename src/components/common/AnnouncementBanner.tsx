'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary text-primary-fg px-4 py-2 text-xs font-medium flex items-center justify-between shadow-md relative z-40 border-b border-primary/20"
      >
        <div className="flex-1 text-center flex items-center justify-center space-x-2 flex-wrap gap-y-1">
          <span className="flex items-center space-x-1 font-bold tracking-wide uppercase bg-black/20 px-2 py-0.5 rounded-full text-[10px]">
            <Sparkles className="w-3 h-3 text-accent animate-spin" />
            <span>FLASH SALE</span>
          </span>
          <span>Get 20% OFF all Luxury Audio & Timepieces with code</span>
          <span className="font-mono font-bold underline decoration-dotted bg-black/10 px-1.5 py-0.5 rounded">
            WELCOME20
          </span>
          <span className="hidden md:inline-block opacity-80">| Ends in:</span>
          <div className="hidden md:flex items-center space-x-1 font-mono font-bold bg-black/20 px-2 py-0.5 rounded text-[11px]">
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
          <Link
            href="/#products"
            className="hidden sm:flex items-center space-x-0.5 hover:underline font-bold text-accent ml-1"
          >
            <span>Shop Now</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-black/10 rounded-full transition-colors ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
