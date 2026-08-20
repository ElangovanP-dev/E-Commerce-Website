'use client'

import { useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'
import { useUIStore } from '@/store/useUIStore'
import { Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react'

export function ProductGrid({ products = [] }: { products: Product[] }) {
  const { filters, resetFilters, openFilterDrawer } = useUIStore()

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase()
        const matchesTitle = p.title.toLowerCase().includes(query)
        const matchesDesc = p.description.toLowerCase().includes(query)
        const matchesSku = p.sku.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDesc && !matchesSku) return false
      }

      // 2. Category
      if (filters.categoryId && p.categoryId !== filters.categoryId) {
        return false
      }

      // 3. Price Range
      const effectivePrice = p.salePrice || p.basePrice
      if (effectivePrice > filters.maxPrice) {
        return false
      }

      // 4. Rating
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false
      }

      // 5. In-Stock Only
      if (filters.inStockOnly && p.stock <= 0) {
        return false
      }

      // 6. Selected Sizes
      if (filters.selectedSizes.length > 0) {
        const hasMatchingSize = p.variants?.some(
          (v) => v.size && filters.selectedSizes.includes(v.size)
        )
        if (!hasMatchingSize) return false
      }

      // 7. Selected Colors
      if (filters.selectedColors.length > 0) {
        const hasMatchingColor = p.variants?.some(
          (v) => v.color && filters.selectedColors.includes(v.color)
        )
        if (!hasMatchingColor) return false
      }

      return true
    }).sort((a, b) => {
      const priceA = a.salePrice || a.basePrice
      const priceB = b.salePrice || b.basePrice

      if (filters.sortBy === 'price-asc') return priceA - priceB
      if (filters.sortBy === 'price-desc') return priceB - priceA
      if (filters.sortBy === 'top-rated') return b.rating - a.rating
      if (filters.sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    })
  }, [products, filters])

  return (
    <section id="products" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Premier Inventory</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Featured Products ({filteredProducts.length})
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={openFilterDrawer}
              className="py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-bold flex items-center space-x-2 shadow-sm transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Faceted Filters</span>
              {(filters.categoryId || filters.searchQuery || filters.selectedSizes.length > 0 || filters.selectedColors.length > 0) && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>

            {(filters.categoryId || filters.searchQuery || filters.selectedSizes.length > 0 || filters.selectedColors.length > 0) && (
              <button
                onClick={resetFilters}
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-muted-fg hover:text-foreground text-xs transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center font-bold text-xl">
              ?
            </div>
            <h3 className="font-bold text-lg text-foreground">No Products Found</h3>
            <p className="text-xs text-muted-fg">
              We couldn't find any products matching your specific search filters or keyword criteria.
            </p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-5 rounded-xl bg-primary text-primary-fg font-bold text-xs hover:opacity-90 transition-all shadow-glow inline-block"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
