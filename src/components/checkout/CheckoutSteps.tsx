'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, CreditCard, Truck, User, Check, ArrowRight, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'

export function CheckoutSteps() {
  const router = useRouter()
  const { items, getSubtotal, getDiscountAmount, getShippingFee, getTotal, clearCart } = useCartStore()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Address State
  const [formData, setFormData] = useState({
    email: 'customer@luxurystore.com',
    fullName: 'Elena Rostova',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62704',
    country: 'United States',
    shippingMethod: 'standard', // standard, express, overnight
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  })

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  let shippingCost = getShippingFee()

  if (formData.shippingMethod === 'express') shippingCost = 25.0
  if (formData.shippingMethod === 'overnight') shippingCost = 45.0

  const tax = (subtotal - discount) * 0.08
  const grandTotal = Math.max(0, subtotal - discount + shippingCost + tax)

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order placement
    const orderNumber = `AURA-${Math.floor(100000 + Math.random() * 900000)}`
    
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      router.push(`/checkout/confirmation?orderNumber=${orderNumber}`)
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-card border border-border rounded-3xl p-8 max-w-md mx-auto space-y-4">
        <h3 className="font-bold text-lg text-foreground">Your Bag is Empty</h3>
        <p className="text-xs text-muted-fg">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => router.push('/#products')}
          className="py-3 px-6 rounded-2xl bg-primary text-primary-fg font-bold text-xs shadow-glow inline-block"
        >
          Return to Storefront
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      {/* Left Steps Form */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Step Timeline Indicator */}
        <div className="flex items-center justify-between border-b border-border pb-4 text-xs font-bold">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-muted-fg'}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono">1</span>
            <span>Address</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-fg'}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono">2</span>
            <span>Shipping</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-primary' : 'text-muted-fg'}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono">3</span>
            <span>Payment</span>
          </div>
        </div>

        {/* STEP 1: Address & Contact */}
        {step === 1 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-md">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
                1. Contact & Shipping Address
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-muted-fg block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-muted-fg block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-muted-fg block mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-muted-fg block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-muted-fg block mb-1">State / Province</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-muted-fg block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-muted-fg block mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-sm flex items-center justify-center space-x-2 shadow-glow hover:opacity-95 transition-all"
            >
              <span>Continue to Shipping Method</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Shipping Method */}
        {step === 2 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-md">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
                2. Shipping Method Selection
              </h3>
            </div>

            <div className="space-y-3">
              {[
                { id: 'standard', name: 'Complimentary Standard Shipping', time: '3 - 5 Business Days', cost: getShippingFee() === 0 ? 'FREE' : '$15.00' },
                { id: 'express', name: 'Priority Express Delivery', time: '2 Business Days', cost: '$25.00' },
                { id: 'overnight', name: 'VIP Overnight Courier', time: 'Next Day Air Guaranteed', cost: '$45.00' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setFormData({ ...formData, shippingMethod: method.id })}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    formData.shippingMethod === method.id
                      ? 'border-primary bg-primary/10 font-bold'
                      : 'border-border/60 hover:bg-muted'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{method.name}</h4>
                    <p className="text-[11px] text-muted-fg">{method.time}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">{method.cost}</span>
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 rounded-2xl border border-border text-foreground font-bold text-xs hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-4 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-sm flex items-center justify-center space-x-2 shadow-glow hover:opacity-95 transition-all"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Stripe Payment Elements Simulator */}
        {step === 3 && (
          <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
                  3. Secure Stripe Payment
                </h3>
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            {/* Credit Card Input simulator */}
            <div className="p-4 rounded-2xl border border-border bg-input space-y-4">
              <div>
                <label className="text-[11px] font-bold text-muted-fg block mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-background border border-border text-foreground text-xs rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted-fg block mb-1">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-background border border-border text-foreground text-xs font-mono rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-muted-fg block mb-1">Expiration</label>
                  <input
                    type="text"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full bg-background border border-border text-foreground text-xs font-mono rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-fg block mb-1">CVC Code</label>
                  <input
                    type="text"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full bg-background border border-border text-foreground text-xs font-mono rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-4 px-6 rounded-2xl border border-border text-foreground font-bold text-xs hover:bg-muted"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-4 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-sm flex items-center justify-center space-x-2 shadow-glow hover:opacity-95 transition-all"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatCurrency(grandTotal)} Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Order Summary Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-md sticky top-28">
          <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground border-b border-border pb-4">
            Order Summary ({items.length} items)
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-foreground line-clamp-1">{item.product.title}</h4>
                  <span className="text-muted-fg font-mono">Qty: {item.quantity}</span>
                </div>
                <span className="font-mono font-bold text-foreground">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-fg">
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
              <span>Shipping Fee</span>
              <span className="font-mono text-foreground">{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (Estimated 8%)</span>
              <span className="font-mono text-foreground">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-foreground border-t border-border pt-3">
              <span>Grand Total</span>
              <span className="font-mono text-primary">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
