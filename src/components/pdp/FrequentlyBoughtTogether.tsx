'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Check, ShoppingBag, Sparkles } from 'lucide-react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

export function FrequentlyBoughtTogether({
  mainProduct,
  bundleProducts = [],
}: {
  mainProduct: Product
  bundleProducts: Product[]
}) {
  const { addItem } = useCartStore()
  const [selectedIds, setSelectedIds] = useState<string[]>([
    mainProduct.id,
    ...bundleProducts.slice(0, 2).map((p) => p.id),
  ])
  const [added, setAdded] = useState(false)

  const allItems = [mainProduct, ...bundleProducts.slice(0, 2)]

  const toggleSelect = (id: string) => {
    if (id === mainProduct.id) return // Main product cannot be unselected
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const selectedItems = allItems.filter((item) => selectedIds.includes(item.id))
  const rawTotal = selectedItems.reduce(
    (acc, item) => acc + (item.salePrice || item.basePrice),
    0
  )
  const isBundleDiscount = selectedItems.length > 1
  const bundleDiscountPercentage = isBundleDiscount ? 15 : 0
  const bundleTotal = rawTotal * (1 - bundleDiscountPercentage / 100)

  const handleAddBundleToCart = () => {
    selectedItems.forEach((item) => {
      addItem(item)
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 shadow-md">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        <h3 className="font-extrabold text-lg tracking-tight text-foreground">
          Frequently Bought Together
        </h3>
        {isBundleDiscount && (
          <span className="bg-primary/20 text-primary font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-primary/30">
            Bundle & Save 15%
          </span>
        )}
      </div>

      {/* Thumbnails chain */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {allItems.map((item, idx) => {
          const isSelected = selectedIds.includes(item.id)
          const images = Array.isArray(item.images)
            ? item.images
            : JSON.parse(item.images || '[]')
          const img = images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'

          return (
            <div key={item.id} className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => toggleSelect(item.id)}
                className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all p-1 ${
                  isSelected ? 'border-primary shadow-md' : 'border-border/60 opacity-50'
                }`}
              >
                <Image src={img} alt={item.title} fill className="object-cover rounded-xl" />
                {isSelected && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-fg p-0.5 rounded-full">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>

              {idx < allItems.length - 1 && (
                <div className="text-muted-fg font-bold text-lg">+</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Checkboxes List */}
      <div className="space-y-2 border-t border-border/60 pt-4">
        {allItems.map((item) => {
          const isSelected = selectedIds.includes(item.id)
          return (
            <label
              key={item.id}
              className="flex items-center space-x-3 text-xs cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={item.id === mainProduct.id}
                onChange={() => toggleSelect(item.id)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
              <span className="font-bold text-foreground line-clamp-1">{item.title}</span>
              <span className="font-mono text-muted-fg">
                ({formatCurrency(item.salePrice || item.basePrice)})
              </span>
            </label>
          )
        })}
      </div>

      {/* Total & CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-4">
        <div>
          <div className="text-xs text-muted-fg font-medium">Bundle Price ({selectedItems.length} items):</div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-primary">
              {formatCurrency(bundleTotal)}
            </span>
            {isBundleDiscount && (
              <span className="text-xs text-muted-fg line-through font-mono">
                {formatCurrency(rawTotal)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddBundleToCart}
          className={`w-full sm:w-auto py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-glow transition-all ${
            added ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-fg hover:opacity-95'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added Bundle to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add Selected Bundle to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
