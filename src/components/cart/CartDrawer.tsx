'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Trash2, Plus, Minus, Tag, Truck, ArrowRight, ShoppingBag } from 'lucide-react'
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
    getTotal,
  } = useCartStore()

  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [isApplying, setIsApplying] = useState(false)

  if (!isDrawerOpen) return null

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const shippingThreshold = 4999
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0
  const shipping = isFreeShipping ? 0 : 250
  const total = Math.max(0, subtotal - discount + shipping)
  
  const amountNeeded = Math.max(0, shippingThreshold - subtotal)
  const percentage = Math.min(100, (subtotal / shippingThreshold) * 100)

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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full shadow-2xl z-10 flex flex-col justify-between text-slate-900"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 space-y-3 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#EA580C]" />
                <h3 className="font-black text-base uppercase tracking-wider text-[#0F2C59]">
                  Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-[#EA580C]" />
                  <span>
                    {isFreeShipping
                      ? "🎉 You've unlocked Pan-India Free Express Shipping!"
                      : `${formatCurrency(amountNeeded)} away from Free Express Shipping`}
                  </span>
                </span>
                <span className="font-mono text-[#0F2C59] font-black">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="h-full bg-[#EA580C]"
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-[#0F2C59]">Your Bag is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                  Explore our curated Indian heritage collections and discover handcrafted products.
                </p>
                <button
                  onClick={closeDrawer}
                  className="py-3 px-6 rounded-2xl bg-[#EA580C] text-white font-extrabold text-xs shadow-md hover:bg-[#C2410C] inline-block"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const images = Array.isArray(item.product.images)
                  ? item.product.images
                  : JSON.parse(item.product.images || '[]')
                const thumbnail = images[0] || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80'

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex space-x-4 items-center shadow-sm"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={thumbnail}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-[#0F2C59] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.selectedColor} {item.selectedSize ? `(${item.selectedSize})` : ''}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-black text-sm text-[#EA580C]">
                          {formatCurrency(item.unitPrice)}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-1 border border-slate-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors text-slate-700"
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
            <div className="p-6 border-t border-slate-200 space-y-4 bg-slate-50">
              
              {/* Promo Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                    <div className="flex items-center space-x-2 font-bold">
                      <Tag className="w-4 h-4" />
                      <span>Code: {appliedCoupon.code} (-{formatCurrency(appliedCoupon.value)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs hover:underline text-slate-500 hover:text-slate-900"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. UTSAV20)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                    />
                    <button
                      type="submit"
                      disabled={isApplying}
                      className="bg-[#0F2C59] text-white font-bold text-xs px-4 rounded-xl hover:bg-slate-800 transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-500 font-semibold mt-1">{couponError}</p>}
              </div>

              {/* Financial Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between font-medium">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium">
                  <span>Pan-India Express Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                  <span className="text-[#0F2C59]">Total Amount</span>
                  <span className="text-[#EA580C]">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
