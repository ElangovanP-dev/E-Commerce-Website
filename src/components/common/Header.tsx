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
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-fg flex items-center justify-center font-bold shadow-glow group-hover:scale-105 transition-transform">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-foreground leading-none">
                VESPER <span className="text-primary font-normal">LUXE</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted-fg font-medium">
                Luxury Marketplace
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-muted-fg">
          <Link href="/#products" className="hover:text-foreground transition-colors py-1">
            Shop All
          </Link>
          <Link href="/category/audio-tech" className="hover:text-foreground transition-colors py-1">
            Audio Tech
          </Link>
          <Link href="/category/timepieces" className="hover:text-foreground transition-colors py-1">
            Horology
          </Link>
          <Link href="/category/apparel" className="hover:text-foreground transition-colors py-1">
            Apparel
          </Link>
          <Link href="/category/home-living" className="hover:text-foreground transition-colors py-1">
            Japandi Living
          </Link>
          <Link href="/admin" className="text-primary font-semibold hover:opacity-80 transition-opacity flex items-center space-x-1 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
          </Link>
        </nav>

        {/* Action Controls: Instant Search, Filter Drawer, Wishlist, Cart Drawer, Account */}
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
                  placeholder="Search products, SKU..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  autoFocus
                  className="w-full bg-input border border-primary text-foreground text-xs rounded-full py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-muted-fg hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-muted border border-border/80 text-foreground transition-all"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Faceted Filter Drawer Button */}
          <button
            onClick={toggleFilterDrawer}
            className="p-2.5 rounded-full hover:bg-muted border border-border/80 text-foreground transition-all flex items-center space-x-1.5"
            title="Filter Products"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="hidden xl:inline text-xs font-semibold">Filter</span>
          </button>

          {/* Wishlist Button */}
          <Link
            href="/account/wishlist"
            className="p-2.5 rounded-full hover:bg-muted border border-border/80 text-foreground transition-all relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-accent" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-fg font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            className="p-2.5 rounded-full bg-primary text-primary-fg hover:opacity-90 transition-all relative font-medium shadow-glow flex items-center space-x-2 px-3.5"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold">{totalCartCount}</span>
          </button>

          {/* User Account Portal */}
          <Link
            href="/account"
            className="p-2.5 rounded-full hover:bg-muted border border-border/80 text-foreground transition-all hidden sm:flex"
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
            className="lg:hidden bg-card border-b border-border px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3 font-medium text-sm">
              <Link href="/#products" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Shop All Products
              </Link>
              <Link href="/category/audio-tech" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Audio Tech
              </Link>
              <Link href="/category/timepieces" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Horology & Watches
              </Link>
              <Link href="/category/apparel" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Minimalist Apparel
              </Link>
              <Link href="/category/home-living" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Japandi Home Living
              </Link>
              <Link href="/category/carry-bags" onClick={toggleMobileMenu} className="hover:text-primary transition-colors">
                Luxury Carry & Bags
              </Link>
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Link href="/account" onClick={toggleMobileMenu} className="text-foreground font-semibold flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>My Account</span>
                </Link>
                <Link href="/admin" onClick={toggleMobileMenu} className="text-primary font-bold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
