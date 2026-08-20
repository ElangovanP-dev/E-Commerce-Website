'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, Sparkles, ArrowRight } from 'lucide-react'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem, moveAllToCart, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              Saved Bookmarks
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Wishlist Hub ({items.length})
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={moveAllToCart}
              className="py-3 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-xs flex items-center space-x-2 shadow-glow hover:opacity-95 transition-all self-start sm:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Shopping Bag</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-foreground">Your Wishlist is Empty</h3>
            <p className="text-xs text-muted-fg">Bookmark products while browsing to save them for later.</p>
            <Link
              href="/#products"
              className="py-3 px-6 rounded-2xl bg-primary text-primary-fg font-bold text-xs shadow-glow inline-block"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => {
              const images = Array.isArray(product.images) ? product.images : JSON.parse(product.images || '[]')
              const img = images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'

              return (
                <div key={product.id} className="p-4 rounded-3xl bg-card border border-border space-y-3 shadow-md flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                      <Image src={img} alt={product.title} fill className="object-cover" />
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-foreground line-clamp-1">{product.title}</h4>
                      <p className="font-mono font-bold text-primary text-xs mt-1">
                        {formatCurrency(product.salePrice || product.basePrice)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addItem(product)
                      removeItem(product.id)
                    }}
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-fg font-bold text-xs flex items-center justify-center space-x-1.5 hover:opacity-90 shadow-glow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
