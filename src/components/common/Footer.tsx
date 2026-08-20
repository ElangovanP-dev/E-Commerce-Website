'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react'

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
    <footer className="bg-card border-t border-border text-card-fg transition-colors">
      {/* Value Proposition Highlights */}
      <div className="border-b border-border/60 py-10 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Complimentary Express Shipping</h4>
              <p className="text-xs text-muted-fg mt-0.5">Free global shipping on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">2-Year Worldwide Guarantee</h4>
              <p className="text-xs text-muted-fg mt-0.5">Full craftsmanship & authenticity warranty</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-muted-fg mt-0.5">Instant returns & exchanges guaranteed</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">256-Bit Encrypted Payments</h4>
              <p className="text-xs text-muted-fg mt-0.5">Stripe, Credit Card, Apple & Google Pay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-fg flex items-center justify-center font-bold shadow-glow">
              <Crown className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-wider text-foreground">
              VESPER <span className="text-primary font-normal">LUXE</span>
            </span>
          </div>
          <p className="text-xs text-muted-fg leading-relaxed max-w-sm">
            Curating world-class audio tech, horological timepieces, Japandi living essentials, and minimal apparel designed for discerning connoisseurs.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider block mb-2 text-foreground">
              Join the Private Circle
            </span>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                ✨ Thank you! You have been subscribed to exclusive drops.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-muted-fg absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-input border border-border text-foreground text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-fg p-2.5 rounded-xl hover:opacity-90 transition-all shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">Storefront</h4>
          <ul className="space-y-2.5 text-xs text-muted-fg">
            <li><Link href="/#products" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/category/audio-tech" className="hover:text-primary transition-colors">Audio Tech</Link></li>
            <li><Link href="/category/timepieces" className="hover:text-primary transition-colors">Horology</Link></li>
            <li><Link href="/category/apparel" className="hover:text-primary transition-colors">Apparel</Link></li>
            <li><Link href="/category/home-living" className="hover:text-primary transition-colors">Japandi Living</Link></li>
            <li><Link href="/category/carry-bags" className="hover:text-primary transition-colors">Carry & Bags</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">Customer Portal</h4>
          <ul className="space-y-2.5 text-xs text-muted-fg">
            <li><Link href="/account" className="hover:text-primary transition-colors">Account Dashboard</Link></li>
            <li><Link href="/account" className="hover:text-primary transition-colors">Order History</Link></li>
            <li><Link href="/account/wishlist" className="hover:text-primary transition-colors">Saved Wishlist</Link></li>
            <li><Link href="/#faq" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/admin" className="text-primary font-semibold hover:underline">Merchant Portal (/admin)</Link></li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">Security & Trust</h4>
          <p className="text-xs text-muted-fg leading-relaxed">
            All orders processed securely via Stripe. Compliance with PCI-DSS 3.2 Standard.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono text-muted-fg">
            <span className="px-2 py-1 bg-muted rounded border border-border">STRIPE VERIFIED</span>
            <span className="px-2 py-1 bg-muted rounded border border-border">SSL 256-BIT</span>
            <span className="px-2 py-1 bg-muted rounded border border-border">NEXT.JS 15</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-fg">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Vesper Luxe Marketplace. All rights reserved.</p>
          <div className="flex space-x-6 text-[11px]">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
