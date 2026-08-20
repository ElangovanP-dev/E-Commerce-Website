'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { openQuickView } = useUIStore()

  const isSaved = isInWishlist(product.id)
  const images = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images || '[]')
  
  const primaryImage = images[0] || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  const secondaryImage = images[1] || primaryImage

  const discountPercent = calculateDiscountPercentage(product.basePrice, product.salePrice)
  const isLowStock = product.stock > 0 && product.stock <= 15

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.variants?.[0] || null)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleQuickViewOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
    >
      {/* Product Image Section */}
      <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-100 cursor-pointer">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.title}
            fill
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-[#EA580C] text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#0F2C59] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Artisan Choice
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-500 text-black font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Low Stock ({product.stock})
            </span>
          )}
        </div>

        {/* Action Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistToggle}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all shadow-md ${
              isSaved
                ? 'bg-[#EA580C] text-white border-[#EA580C]'
                : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-white'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuickViewOpen}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add To Cart Hover Button */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg backdrop-blur-md ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#EA580C] text-white hover:bg-[#C2410C]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#0F2C59]">
              {product.category?.name || 'Heritage Craft'}
            </span>
            <div className="flex items-center space-x-1 font-bold text-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-sm text-[#0F172A] line-clamp-1 group-hover:text-[#EA580C] transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Variant Specs */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-black text-[#EA580C]">
              {formatCurrency(product.salePrice || product.basePrice)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                {formatCurrency(product.basePrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {product.variants?.length ? `${product.variants.length} Options` : 'In Stock'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
