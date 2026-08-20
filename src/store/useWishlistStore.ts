import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'
import { useCartStore } from './useCartStore'

interface WishlistState {
  items: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  removeItem: (productId: string) => void
  moveAllToCart: () => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id)
          if (exists) {
            return { items: state.items.filter((p) => p.id !== product.id) }
          } else {
            return { items: [...state.items, product] }
          }
        })
      },

      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId)
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((p) => p.id !== productId) }))
      },

      moveAllToCart: () => {
        const cartStore = useCartStore.getState()
        const items = get().items
        items.forEach((product) => {
          cartStore.addItem(product)
        })
        set({ items: [] })
        cartStore.openDrawer()
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
