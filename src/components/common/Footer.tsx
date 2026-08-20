'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Lock, HeartHandshake } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 transition-colors">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/20 text-[#F97316] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Pan-India Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free delivery across 28,000+ pincodes</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/20 text-[#F97316] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Authentic Indian Craftsmanship</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sourced from 100% verified master artisans</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/20 text-[#F97316] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">7-Day Easy Doorstep Pickup</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free exchange & instant refunds</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/20 text-[#F97316] flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Secure Encrypted Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">UPI, Razorpay, RuPay & Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#EA580C] text-white flex items-center justify-center font-bold shadow-lg">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-wider text-white leading-none">
                VEDA <span className="text-[#F97316] font-semibold">& CO.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
                Curated Indian Luxury & Modern Living
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Preserving Indian heritage craftsmanship through solid Sheesham woodwork, Moradabad brassware, pure Kashmiri Pashmina, Kannauj attars, and fine leatherware.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider block mb-2 text-white">
              Subscribe for Festive Drop Alerts
            </span>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                ✨ Subscribed! You will receive exclusive festive drops and offer codes.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-800/80 border border-slate-700 text-white text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#EA580C] hover:bg-[#C2410C] text-white p-2.5 rounded-xl transition-all shrink-0 font-bold"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Curated Catalog</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
            <li><Link href="/products" className="hover:text-[#F97316] transition-colors">All Products</Link></li>
            <li><Link href="/category/home-decor" className="hover:text-[#F97316] transition-colors">Heritage Home & Brass</Link></li>
            <li><Link href="/category/apparel" className="hover:text-[#F97316] transition-colors">Handcrafted Silk & Apparel</Link></li>
            <li><Link href="/category/wellness" className="hover:text-[#F97316] transition-colors">Artisanal Scents & Wellness</Link></li>
            <li><Link href="/category/leather-bags" className="hover:text-[#F97316] transition-colors">Premium Leather & Carry</Link></li>
          </ul>
        </div>

        {/* Portal Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Customer Portal</h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
            <li><Link href="/account" className="hover:text-[#F97316] transition-colors">My Account</Link></li>
            <li><Link href="/account" className="hover:text-[#F97316] transition-colors">Track Order</Link></li>
            <li><Link href="/account" className="hover:text-[#F97316] transition-colors">Return Center</Link></li>
            <li><Link href="/#size-guide" className="hover:text-[#F97316] transition-colors">Size Guide</Link></li>
            <li><Link href="/#artisan" className="hover:text-[#F97316] transition-colors">Artisan Story</Link></li>
            <li><Link href="/admin" className="text-[#F97316] font-bold hover:underline">Merchant Portal (/admin)</Link></li>
          </ul>
        </div>

        {/* Payment Badges & Compliance */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Accepted Payments</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Secure checkout powered by Razorpay, Stripe & Bank Gateways.
          </p>
          <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">UPI</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">RAZORPAY</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">RUPAY</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">VISA</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">MASTERCARD</span>
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[#F97316]">CASH ON DELIVERY</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 VEDA & CO. Designed & Handcrafted in India. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px] font-medium">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Artisan Verification</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
