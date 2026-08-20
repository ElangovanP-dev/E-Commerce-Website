'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  SlidersHorizontal,
  Crown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { items: cartItems, openDrawer: openCartDrawer } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { filters, setFilters, toggleFilterDrawer, toggleMobileMenu, isMobileMenuOpen } = useUIStore()
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-[#0F172A] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0F2C59] text-white flex items-center justify-center font-bold shadow-md group-hover:bg-[#EA580C] transition-colors">
              <Crown className="w-5 h-5 text-[#F97316] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-wider text-[#0F2C59] leading-none">
                VEDA <span className="text-[#EA580C] font-semibold">& CO.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">
                Curated Indian Luxury & Modern Living
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-700">
          <Link href="/products" className="hover:text-[#EA580C] transition-colors py-1">
            All Products
          </Link>
          <Link href="/category/home-decor" className="hover:text-[#EA580C] transition-colors py-1">
            Heritage Home & Brass
          </Link>
          <Link href="/category/apparel" className="hover:text-[#EA580C] transition-colors py-1">
            Handcrafted Silk & Apparel
          </Link>
          <Link href="/category/wellness" className="hover:text-[#EA580C] transition-colors py-1">
            Artisanal Scents & Wellness
          </Link>
          <Link href="/category/leather-bags" className="hover:text-[#EA580C] transition-colors py-1">
            Premium Leather & Carry
          </Link>
          <Link 
            href="/admin" 
            className="bg-slate-100 border border-slate-200 text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all"
          >
            <Sparkles className="w-3 h-3 text-[#EA580C]" />
            <span>Admin CMS</span>
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Live Search Bar */}
          <div className="relative">
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '220px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search Pashmina, Brass, Attar..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  autoFocus
                  className="w-full bg-slate-50 border border-[#0F2C59] text-slate-900 text-xs rounded-full py-2 pl-3 pr-8 focus:outline-none shadow-sm"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Faceted Filter Drawer Button */}
          <button
            onClick={toggleFilterDrawer}
            className="p-2.5 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all flex items-center space-x-1.5"
            title="Filter Products"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#EA580C]" />
            <span className="hidden xl:inline text-xs font-bold">Filter</span>
          </button>

          {/* Wishlist Button */}
          <Link
            href="/account/wishlist"
            className="p-2.5 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-[#EA580C]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EA580C] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            className="p-2.5 rounded-full bg-[#EA580C] text-white hover:bg-[#C2410C] transition-all relative font-medium shadow-md flex items-center space-x-2 px-3.5"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-black">{totalCartCount}</span>
          </button>

          {/* User Account Portal */}
          <Link
            href="/account"
            className="p-2.5 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all hidden sm:flex"
            title="My Account"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-3 font-bold text-sm text-slate-800">
              <Link href="/products" onClick={toggleMobileMenu} className="hover:text-[#EA580C] transition-colors">
                All Products
              </Link>
              <Link href="/category/home-decor" onClick={toggleMobileMenu} className="hover:text-[#EA580C] transition-colors">
                Heritage Home & Brass
              </Link>
              <Link href="/category/apparel" onClick={toggleMobileMenu} className="hover:text-[#EA580C] transition-colors">
                Handcrafted Silk & Apparel
              </Link>
              <Link href="/category/wellness" onClick={toggleMobileMenu} className="hover:text-[#EA580C] transition-colors">
                Artisanal Scents & Wellness
              </Link>
              <Link href="/category/leather-bags" onClick={toggleMobileMenu} className="hover:text-[#EA580C] transition-colors">
                Premium Leather & Carry
              </Link>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <Link href="/account" onClick={toggleMobileMenu} className="text-[#0F2C59] font-bold flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#EA580C]" />
                  <span>My Account</span>
                </Link>
                <Link href="/admin" onClick={toggleMobileMenu} className="text-[#EA580C] font-bold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Admin CMS</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
