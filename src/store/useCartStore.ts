import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant, Coupon } from '@/types'

const FREE_SHIPPING_THRESHOLD = 150.0

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  appliedCoupon: Coupon | null
  couponError: string | null
  
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  
  addItem: (product: Product, variant?: ProductVariant | null, color?: string, size?: string, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  
  getSubtotal: () => number
  getDiscountAmount: () => number
  getShippingFee: () => number
  getTotal: () => number
  getFreeShippingProgress: () => { amountNeeded: number; percentage: number; isFree: boolean }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,
      couponError: null,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, variant, color, size, quantity = 1) => {
        const variantId = variant?.id || 'default'
        const colorKey = color || variant?.color || ''
        const sizeKey = size || variant?.size || ''
        const itemId = `${product.id}-${variantId}-${colorKey}-${sizeKey}`

        const unitPrice = variant ? variant.price : (product.salePrice || product.basePrice)

        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === itemId)
          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex].quantity += quantity
            return { items: updated, isDrawerOpen: true }
          } else {
            const newItem: CartItem = {
              id: itemId,
              product,
              selectedVariant: variant || null,
              selectedColor: colorKey,
              selectedSize: sizeKey,
              quantity,
              unitPrice,
            }
            return { items: [...state.items, newItem], isDrawerOpen: true }
          }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [], appliedCoupon: null, couponError: null }),

      applyCoupon: async (code: string) => {
        const cleanCode = code.trim().toUpperCase()
        set({ couponError: null })
        
        // Mock coupon matching for instant interactive client validation
        const mockCoupons: Record<string, Coupon> = {
          'WELCOME20': {
            id: 'c1',
            code: 'WELCOME20',
            discountType: 'PERCENTAGE',
            value: 20,
            minSpend: 50,
            maxUses: 500,
            usedCount: 12,
            isActive: true,
          },
          'SAVE50': {
            id: 'c2',
            code: 'SAVE50',
            discountType: 'FIXED',
            value: 50,
            minSpend: 200,
            maxUses: 100,
            usedCount: 5,
            isActive: true,
          },
          'VIPSUMMER': {
            id: 'c3',
            code: 'VIPSUMMER',
            discountType: 'PERCENTAGE',
            value: 30,
            minSpend: 150,
            maxUses: 50,
            usedCount: 2,
            isActive: true,
          },
        }

        const coupon = mockCoupons[cleanCode]
        const subtotal = get().getSubtotal()

        if (!coupon) {
          set({ couponError: 'Invalid or expired coupon code' })
          return false
        }

        if (subtotal < coupon.minSpend) {
          set({ couponError: `Minimum spend of $${coupon.minSpend} required for code ${coupon.code}` })
          return false
        }

        set({ appliedCoupon: coupon, couponError: null })
        return true
      },

      removeCoupon: () => set({ appliedCoupon: null, couponError: null }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal()
        const coupon = get().appliedCoupon
        if (!coupon) return 0

        if (coupon.discountType === 'PERCENTAGE') {
          return (subtotal * coupon.value) / 100
        } else {
          return Math.min(coupon.value, subtotal)
        }
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal()
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0
        return 15.0
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscountAmount()
        const shipping = get().getShippingFee()
        const tax = (subtotal - discount) * 0.08 // 8% estimated tax
        return Math.max(0, subtotal - discount + shipping + tax)
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal()
        const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
        const percentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
        return {
          amountNeeded,
          percentage,
          isFree: subtotal >= FREE_SHIPPING_THRESHOLD,
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
)
