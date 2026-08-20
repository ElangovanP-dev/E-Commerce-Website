'use client'

import { useState } from 'react'
import { Star, ShieldCheck, ShoppingBag, Heart, Ruler, Check, Truck, RefreshCw } from 'lucide-react'
import { Product } from '@/types'
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useUIStore } from '@/store/useUIStore'

export function ProductClientDetails({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { toggleSizeGuide } = useUIStore()

  const variants = product.variants || []
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const selectedVariant = variants[selectedVariantIdx] || null
  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product.salePrice || product.basePrice

  const discountPercent = calculateDiscountPercentage(product.basePrice, product.salePrice)
  const isSaved = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedVariant, selectedVariant?.color || '', selectedVariant?.size || '', quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="space-y-6 text-foreground">
      {/* Category & Rating */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
          {product.category?.name || 'Luxury Collection'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {product.title}
        </h1>
        <div className="flex items-center space-x-3 mt-3">
          <div className="flex items-center text-amber-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-mono font-bold ml-1 text-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-muted-fg">•</span>
          <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticity Guaranteed</span>
          </span>
          <span className="text-xs text-muted-fg">•</span>
          <span className="text-xs font-mono text-muted-fg">SKU: {selectedVariant?.sku || product.sku}</span>
        </div>
      </div>

      {/* Pricing Header */}
      <div className="flex items-baseline space-x-4">
        <span className="text-4xl font-black font-mono text-foreground">
          {formatCurrency(currentPrice)}
        </span>
        {product.salePrice && (
          <span className="text-lg text-muted-fg line-through font-mono">
            {formatCurrency(product.basePrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-primary text-primary-fg font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            Save {discountPercent}%
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-muted-fg leading-relaxed">
        {product.description}
      </p>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="space-y-3 border-t border-border/60 pt-4">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold uppercase tracking-wider text-muted-fg">
              Select Variant / Size / Color
            </label>
            <button
              onClick={toggleSizeGuide}
              className="text-primary hover:underline font-semibold flex items-center space-x-1"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Guide</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all ${
                  selectedVariantIdx === idx
                    ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                    : 'border-border/60 hover:bg-muted text-foreground'
                }`}
              >
                {v.color && <span>{v.color} </span>}
                {v.size && <span className="font-mono">({v.size})</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-4 px-8 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-glow ${
              added ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-fg hover:opacity-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Shopping Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </>
            )}
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`p-4 rounded-2xl border transition-all ${
              isSaved
                ? 'bg-accent text-accent-fg border-accent'
                : 'border-border text-foreground hover:bg-muted'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/30 border border-border text-xs text-muted-fg">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-primary" />
            <span>Free Express Delivery Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}
