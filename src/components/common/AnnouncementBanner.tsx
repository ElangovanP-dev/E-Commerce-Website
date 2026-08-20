'use client'

import { useState } from 'react'
import { Sparkles, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-[#0F2C59] text-white px-4 py-2.5 text-xs font-medium flex items-center justify-between shadow-md relative z-40"
      >
        <div className="flex-1 text-center flex items-center justify-center space-x-2 flex-wrap gap-y-1">
          <span className="flex items-center space-x-1 font-bold tracking-wide uppercase bg-[#EA580C] text-white px-2 py-0.5 rounded-full text-[10px]">
            <Sparkles className="w-3 h-3" />
            <span>FESTIVE SALE</span>
          </span>
          <span className="font-semibold">Flat ₹1,500 OFF on orders above ₹4,999 with code</span>
          <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded text-white border border-white/30">
            UTSAV20
          </span>
          <span className="hidden md:inline-block opacity-90">| Free Express Pan-India Delivery</span>
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-0.5 hover:underline font-bold text-[#F97316] ml-2"
          >
            <span>Shop Festive Drops</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
