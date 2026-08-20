'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()
  const subtotal = getSubtotal()
  const shippingFee = subtotal >= 4999 || subtotal === 0 ? 0 : 250
  const grandTotal = subtotal + shippingFee

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F2C59]">Your Shopping Bag</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Review your selected artisan items before checkout</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-[#EA580C] hover:underline flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0F2C59]">Your bag is currently empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">Explore our festive collection of authentic handcrafted Indian heritage items.</p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-[#EA580C] text-white px-6 py-3 rounded-2xl text-xs font-extrabold shadow-md hover:bg-[#C2410C] transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shrink-0">
                      {/* Product Image */}
                      {item.image && (
                        <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0F2C59] line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.variantName || 'Standard'}</p>
                      <span className="text-xs font-black text-[#EA580C] mt-1 block">{formatCurrency(item.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden text-xs font-bold bg-slate-50">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)} className="px-2.5 py-1 hover:bg-slate-200 text-slate-700">-</button>
                      <span className="px-3 py-1 bg-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)} className="px-2.5 py-1 hover:bg-slate-200 text-slate-700">+</button>
                    </div>

                    <button onClick={() => removeItem(item.productId, item.variantId)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm h-fit">
              <h3 className="font-extrabold text-sm text-[#0F2C59] uppercase tracking-wider border-b border-slate-100 pb-3">Order Summary</h3>
              <div className="space-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pan-India Express Shipping</span>
                  <span className="font-bold text-emerald-600">{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-[#0F2C59]">
                  <span>Total Amount</span>
                  <span className="text-[#EA580C]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white py-3.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}
