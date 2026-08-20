'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/useUIStore'
import { useCartStore } from '@/store/useCartStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils'

export function QuickViewModal() {
  const { quickViewProduct, isQuickViewOpen, closeQuickView } = useUIStore()
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [added, setAdded] = useState(false)

  if (!isQuickViewOpen || !quickViewProduct) return null

  const images = Array.isArray(quickViewProduct.images)
    ? quickViewProduct.images
    : JSON.parse(quickViewProduct.images || '[]')

  const isSaved = isInWishlist(quickViewProduct.id)
  const variants = quickViewProduct.variants || []
  const selectedVariant = variants[selectedVariantIdx] || null

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : quickViewProduct.salePrice || quickViewProduct.basePrice

  const discountPercent = calculateDiscountPercentage(quickViewProduct.basePrice, quickViewProduct.salePrice)

  const handleAddToCart = () => {
    addItem(quickViewProduct, selectedVariant)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-2xl z-10 p-6 sm:p-8 text-foreground grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-fg hover:text-foreground transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery Preview */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/40 border border-border">
              <Image
                src={images[selectedImageIdx] || images[0]}
                alt={quickViewProduct.title}
                fill
                className="object-cover object-center"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-primary text-primary-fg font-extrabold text-xs uppercase px-3 py-1 rounded-full shadow-sm">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIdx === idx ? 'border-primary' : 'border-border/60 hover:border-primary/50'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Variant Selector */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
                  {quickViewProduct.category?.name || 'Luxury Item'}
                </span>
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                  {quickViewProduct.title}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-mono font-bold ml-1 text-foreground">
                      {quickViewProduct.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-fg">•</span>
                  <span className="text-xs text-muted-fg font-mono">SKU: {quickViewProduct.sku}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-extrabold text-foreground">
                  {formatCurrency(currentPrice)}
                </span>
                {quickViewProduct.salePrice && (
                  <span className="text-base text-muted-fg line-through">
                    {formatCurrency(quickViewProduct.basePrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-muted-fg leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Variants Selector */}
              {variants.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                    Available Variants
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          selectedVariantIdx === idx
                            ? 'border-primary bg-primary/10 text-primary font-bold'
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
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-glow ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary text-primary-fg hover:opacity-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isSaved
                      ? 'bg-accent text-accent-fg border-accent'
                      : 'border-border text-foreground hover:bg-muted'
                  }`}
                  title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-fg pt-1">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Complimentary Shipping & Returns</span>
                </div>
                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  onClick={closeQuickView}
                  className="font-bold text-primary hover:underline flex items-center space-x-0.5"
                >
                  <span>Full Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
