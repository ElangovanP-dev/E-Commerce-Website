'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const HERO_SLIDES = [
  {
    id: 1,
    badge: '2026 ARCHITECTURAL COLLECTION',
    title: 'Aura ANC Studio Headphones',
    subtitle: 'Studio-grade acoustics with titanium drivers, 40-hour battery, and active noise cancellation.',
    ctaText: 'Explore Audio Tech',
    ctaLink: '/category/audio-tech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    tag: '$299.99 (Reg $349.99)',
  },
  {
    id: 2,
    badge: 'SWISS PRECISION HOROLOGY',
    title: 'Aethelgard Automatic Skeleton',
    subtitle: 'Swiss ETA 2824 mechanical movement visible through dual sapphire crystal domes.',
    ctaText: 'Discover Timepieces',
    ctaLink: '/category/timepieces',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    tag: 'Limited Production #045/500',
  },
  {
    id: 3,
    badge: 'SUSTAINABLE JAPANDI LIVING',
    title: 'Kyoto Travertine Stone Lamp',
    subtitle: 'Hand-carved natural travertine stone base with unbleached organic linen drum shade.',
    ctaText: 'View Home Living',
    ctaLink: '/category/home-living',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Artisanal Hand-Crafted',
  },
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = HERO_SLIDES[currentIndex]

  return (
    <section className="relative w-full overflow-hidden bg-background py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border min-h-[480px] lg:min-h-[560px] flex items-center shadow-2xl">
          
          {/* Animated Background Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                priority
                className="object-cover object-center brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Text Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-foreground">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-2">
                  <span className="bg-primary/20 border border-primary/40 text-primary font-bold text-[11px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center space-x-1 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                    <span>{currentSlide.badge}</span>
                  </span>
                  <span className="text-xs text-muted-fg font-mono hidden sm:inline">{currentSlide.tag}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                  {currentSlide.title}
                </h1>

                <p className="text-sm sm:text-base text-muted-fg leading-relaxed max-w-lg">
                  {currentSlide.subtitle}
                </p>

                <div className="flex items-center space-x-4 pt-2">
                  <Link
                    href={currentSlide.ctaLink}
                    className="inline-flex items-center space-x-2 bg-primary text-primary-fg font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-glow hover:opacity-90 transition-all group"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/#products"
                    className="inline-flex items-center space-x-2 bg-muted/80 text-foreground border border-border font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-2xl hover:bg-muted transition-all backdrop-blur-md"
                  >
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>2-Yr Warranty</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-3">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
              }
              className="p-3 rounded-full bg-card/80 border border-border/80 text-foreground hover:bg-card transition-colors backdrop-blur-md shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex space-x-1.5 px-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-primary w-7' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-3 rounded-full bg-card/80 border border-border/80 text-foreground hover:bg-card transition-colors backdrop-blur-md shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
