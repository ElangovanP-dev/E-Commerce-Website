'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Award, Truck, RotateCcw, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0F2C59] border border-slate-200 min-h-[480px] lg:min-h-[520px] flex items-center shadow-2xl">
          
          {/* Background Heritage Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80"
              alt="VEDA & CO. Indian Handcrafted Luxury"
              fill
              priority
              className="object-cover object-center brightness-[0.45]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2C59] via-[#0F2C59]/85 to-transparent" />
          </div>

          {/* Banner Text Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#F97316] font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CURATED INDIAN HERITAGE DROPS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                Handcrafted Luxury for the Modern Indian Lifestyle
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                Authentic brassware, pure Kashmiri Pashmina, handcrafted leather, artisanal scents, and premium heritage tech.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <span>Explore Festive Drops</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/category/home-decor"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-4 rounded-2xl transition-all backdrop-blur-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                  <span>Heritage Home & Brass</span>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">100% Verified Indian Artisans</h5>
              <p className="text-[11px] text-slate-500 font-medium">Direct fair-trade sourcing</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">Pan-India Free Express Shipping</h5>
              <p className="text-[11px] text-slate-500 font-medium">Delivered to 28,000+ pincodes</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">7-Day Easy Returns & Exchange</h5>
              <p className="text-[11px] text-slate-500 font-medium">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">Secure UPI, Cards & NetBanking</h5>
              <p className="text-[11px] text-slate-500 font-medium">Instant 256-bit SSL checkout</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
