import { create } from 'zustand'
import { Product, FilterState } from '@/types'

const initialFilters: FilterState = {
  searchQuery: '',
  categoryId: null,
  minPrice: 0,
  maxPrice: 4000,
  minRating: 0,
  inStockOnly: false,
  selectedSizes: [],
  selectedColors: [],
  sortBy: 'featured',
}

interface UIState {
  quickViewProduct: Product | null
  isQuickViewOpen: boolean
  isFilterDrawerOpen: boolean
  isSizeGuideOpen: boolean
  isMobileMenuOpen: boolean
  
  filters: FilterState
  
  openQuickView: (product: Product) => void
  closeQuickView: () => void
  
  toggleFilterDrawer: () => void
  openFilterDrawer: () => void
  closeFilterDrawer: () => void
  
  toggleSizeGuide: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  
  setFilters: (update: Partial<FilterState> | ((prev: FilterState) => FilterState)) => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  quickViewProduct: null,
  isQuickViewOpen: false,
  isFilterDrawerOpen: false,
  isSizeGuideOpen: false,
  isMobileMenuOpen: false,

  filters: initialFilters,

  openQuickView: (product) => set({ quickViewProduct: product, isQuickViewOpen: true }),
  closeQuickView: () => set({ quickViewProduct: null, isQuickViewOpen: false }),

  toggleFilterDrawer: () => set((s) => ({ isFilterDrawerOpen: !s.isFilterDrawerOpen })),
  openFilterDrawer: () => set({ isFilterDrawerOpen: true }),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

  toggleSizeGuide: () => set((s) => ({ isSizeGuideOpen: !s.isSizeGuideOpen })),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  setFilters: (update) =>
    set((s) => ({
      filters: typeof update === 'function' ? update(s.filters) : { ...s.filters, ...update },
    })),

  resetFilters: () => set({ filters: initialFilters }),
}))
