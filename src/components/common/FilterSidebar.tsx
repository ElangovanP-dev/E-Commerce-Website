'use client'

import { SlidersHorizontal, X, RotateCcw, Check, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/useUIStore'
import { Category } from '@/types'

const SIZES = ['S', 'M', 'L', 'XL', 'Universal', '38mm', '40mm', '42mm', '44mm']
const COLORS = ['Matte Obsidian', 'Arctic Ice Silver', 'Cyber Purple', 'Sand Beige', 'Clear Glass', 'Chalk White']

export function FilterSidebar({ categories = [] }: { categories?: Category[] }) {
  const { filters, setFilters, resetFilters, isFilterDrawerOpen, closeFilterDrawer } = useUIStore()

  const handleCategorySelect = (catId: string) => {
    setFilters({ categoryId: filters.categoryId === catId ? null : catId })
  }

  const handleSizeToggle = (size: string) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size]
    setFilters({ selectedSizes: updated })
  }

  const handleColorToggle = (color: string) => {
    const updated = filters.selectedColors.includes(color)
      ? filters.selectedColors.filter((c) => c !== color)
      : [...filters.selectedColors, color]
    setFilters({ selectedColors: updated })
  }

  return (
    <AnimatePresence>
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFilterDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-card border-l border-border h-full shadow-2xl z-10 flex flex-col justify-between text-foreground"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-base uppercase tracking-wider">Faceted Filter Drawer</h3>
              </div>
              <button
                onClick={closeFilterDrawer}
                className="p-1.5 rounded-full hover:bg-muted text-muted-fg hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Controls Body */}
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              {/* Search input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                  Search Term
                </label>
                <input
                  type="text"
                  placeholder="Keyword, title, or SKU..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ searchQuery: e.target.value })}
                  className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Sorting */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                  Sort Order
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ sortBy: e.target.value as any })}
                  className="w-full bg-input border border-border text-foreground text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                >
                  <option value="featured">Featured Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="top-rated">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                    Product Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((c) => {
                      const isSelected = filters.categoryId === c.id
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleCategorySelect(c.id)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary font-bold'
                              : 'border-border/60 hover:bg-muted text-foreground'
                          }`}
                        >
                          <span>{c.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Price Range Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold uppercase tracking-wider text-muted-fg">
                    Price Cap: ${filters.maxPrice}
                  </label>
                  <span className="font-mono text-primary font-bold">$0 - ${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Star Rating Filter */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                  Minimum Star Rating
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 4.0, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ minRating: rating })}
                      className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 ${
                        filters.minRating === rating
                          ? 'border-primary bg-primary text-primary-fg'
                          : 'border-border/60 hover:bg-muted text-foreground'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>{rating === 0 ? 'All' : `${rating}+`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  In-Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ inStockOnly: e.target.checked })}
                  className="w-4 h-4 accent-primary rounded cursor-pointer"
                />
              </div>

              {/* Size Chips */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                  Sizes & Dimensions
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => {
                    const isSelected = filters.selectedSizes.includes(size)
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-fg'
                            : 'border-border/60 hover:bg-muted text-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-fg block">
                  Color Swatches
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => {
                    const isSelected = filters.selectedColors.includes(color)
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorToggle(color)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-all ${
                          isSelected
                            ? 'border-accent bg-accent text-accent-fg font-bold'
                            : 'border-border/60 hover:bg-muted text-foreground'
                        }`}
                      >
                        {color}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border flex items-center space-x-3 bg-muted/20">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 px-4 rounded-xl border border-border text-foreground font-bold text-xs hover:bg-muted flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={closeFilterDrawer}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-fg font-bold text-xs hover:opacity-95 shadow-glow"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
