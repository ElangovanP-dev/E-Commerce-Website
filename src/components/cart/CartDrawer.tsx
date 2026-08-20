'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2, Plus, Minus, Tag, Truck, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    getFreeShippingProgress,
  } = useCartStore()

  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  if (!isDrawerOpen) return null

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const shipping = getShippingFee()
  const total = getTotal()
  const { amountNeeded, percentage, isFree } = getFreeShippingProgress()

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCodeInput.trim()) return
    setIsApplying(true)
    await applyCoupon(couponCodeInput)
    setIsApplying(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-card border-l border-border h-full shadow-2xl z-10 flex flex-col justify-between text-foreground"
        >
          {/* Header */}
          <div className="p-6 border-b border-border space-y-3 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-base uppercase tracking-wider">
                  Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-full hover:bg-muted text-muted-fg hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>
                    {isFree
                      ? "🎉 You've unlocked Complimentary Express Shipping!"
                      : `$${amountNeeded.toFixed(2)} away from Free Express Shipping`}
                  </span>
                </span>
                <span className="font-mono text-primary font-bold">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base">Your Bag is Empty</h4>
                <p className="text-xs text-muted-fg max-w-xs mx-auto">
                  Explore our curated luxury collections and discover premium items.
                </p>
                <button
                  onClick={closeDrawer}
                  className="py-3 px-6 rounded-2xl bg-primary text-primary-fg font-bold text-xs shadow-glow inline-block"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const images = Array.isArray(item.product.images)
                  ? item.product.images
                  : JSON.parse(item.product.images || '[]')
                const thumbnail = images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl border border-border bg-card/60 flex space-x-4 items-center"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                      <Image
                        src={thumbnail}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-foreground line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-fg hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-muted-fg font-mono">
                          {item.selectedColor} {item.selectedSize ? `(${item.selectedSize})` : ''}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-extrabold text-sm text-foreground">
                          {formatCurrency(item.unitPrice)}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center space-x-2 bg-muted rounded-xl p-1 border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-card rounded-lg transition-colors text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-card rounded-lg transition-colors text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border space-y-4 bg-muted/20">
              
              {/* Promo Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <div className="flex items-center space-x-2 font-bold">
                      <Tag className="w-4 h-4" />
                      <span>Code: {appliedCoupon.code} (-{appliedCoupon.value}{appliedCoupon.discountType === 'PERCENTAGE' ? '%' : '$'})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs hover:underline text-muted-fg hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME20)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-input border border-border text-foreground text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="bg-card border border-border hover:bg-muted text-foreground font-bold text-xs px-4 rounded-xl transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-400 mt-1">{couponError}</p>}
              </div>

              {/* Financial Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-muted-fg border-t border-border/60 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-foreground font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono text-foreground">
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-foreground font-extrabold text-base pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-sm flex items-center justify-center space-x-2 hover:opacity-95 transition-all shadow-glow"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
