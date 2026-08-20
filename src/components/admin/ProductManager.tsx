'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Search, Trash2, Edit3, Sparkles, X, Check, Grid, List } from 'lucide-react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

export function ProductManager({ initialProducts = [] }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // New Product Form State
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('audio-tech')
  const [newDescription, setNewDescription] = useState('')
  const [generatedSku, setGeneratedSku] = useState('')
  
  // Matrix Generator State
  const [sizesInput, setSizesInput] = useState('M, L, XL')
  const [colorsInput, setColorsInput] = useState('Obsidian Black, Silver')
  const [generatedVariants, setGeneratedVariants] = useState<{ size: string; color: string; sku: string; price: number }[]>([])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleGenerateMatrix = () => {
    const sizes = sizesInput.split(',').map((s) => s.trim()).filter(Boolean)
    const colors = colorsInput.split(',').map((c) => c.trim()).filter(Boolean)

    const baseSku = generatedSku || `PROD-${Math.floor(1000 + Math.random() * 9000)}`
    const basePriceNum = Number(newPrice) || 199.99

    const matrix: { size: string; color: string; sku: string; price: number }[] = []
    sizes.forEach((s) => {
      colors.forEach((c) => {
        matrix.push({
          size: s,
          color: c,
          sku: `${baseSku}-${s}-${c.substring(0, 3).toUpperCase()}`,
          price: basePriceNum,
        })
      })
    })

    setGeneratedVariants(matrix)
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newPrice) return

    const newProd: Product = {
      id: `p-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      description: newDescription || 'High-end luxury item.',
      basePrice: Number(newPrice),
      salePrice: null,
      sku: generatedSku || `SKU-${Date.now()}`,
      categoryId: newCategory,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      stock: 50,
      rating: 5.0,
      isFeatured: true,
      variants: generatedVariants.map((v, i) => ({
        id: `v-${i}`,
        productId: `p-${Date.now()}`,
        size: v.size,
        color: v.color,
        sku: v.sku,
        price: v.price,
        stockQuantity: 25,
      })),
    }

    setProducts([newProd, ...products])
    setIsAddModalOpen(false)
    setNewTitle('')
    setNewPrice('')
    setGeneratedVariants([])
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Inventory & Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Products ({products.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-3 px-5 rounded-2xl bg-primary text-primary-fg font-extrabold text-xs flex items-center space-x-2 shadow-glow hover:opacity-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-card border border-border flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-fg absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-input border border-border text-foreground text-xs rounded-xl py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Product Data Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-fg uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Variants</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((prod) => {
                const images = Array.isArray(prod.images) ? prod.images : JSON.parse(prod.images || '[]')
                const img = images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'

                return (
                  <tr key={prod.id} className="hover:bg-muted/40 font-medium">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                          <Image src={img} alt={prod.title} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground line-clamp-1">{prod.title}</div>
                          <div className="text-[10px] text-primary font-mono">{prod.category?.name || 'Luxury Category'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-muted-fg">{prod.sku}</td>
                    <td className="p-4 font-mono font-bold text-primary">{formatCurrency(prod.salePrice || prod.basePrice)}</td>
                    <td className="p-4 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${prod.stock > 10 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="p-4 font-mono text-muted-fg">{prod.variants?.length || 0} variants</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-2 rounded-xl hover:bg-red-500/10 text-muted-fg hover:text-red-500 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          
          <form onSubmit={handleSaveProduct} className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 z-10 text-foreground shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-base uppercase tracking-wider">Add New Product & Variant Matrix</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} type="button" className="p-1.5 rounded-full hover:bg-muted text-muted-fg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-muted-fg block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Aura Spatial Wireless Headphones"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value)
                    setGeneratedSku(`SKU-${e.target.value.toUpperCase().replace(/\s+/g, '-').substring(0, 8)}`)
                  }}
                  required
                  className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-muted-fg block mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    placeholder="299.99"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                    className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-muted-fg block mb-1">Auto-Generated SKU</label>
                  <input
                    type="text"
                    value={generatedSku}
                    onChange={(e) => setGeneratedSku(e.target.value)}
                    className="w-full bg-input border border-border text-foreground font-mono rounded-xl p-3 focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-muted-fg block mb-1">Markdown Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed specifications..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Variant Matrix Generator (Sizes x Colors) */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-primary">Variant Matrix Generator</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-muted-fg block mb-1">Sizes (comma separated)</label>
                    <input
                      type="text"
                      value={sizesInput}
                      onChange={(e) => setSizesInput(e.target.value)}
                      className="w-full bg-input border border-border text-foreground rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-fg block mb-1">Colors (comma separated)</label>
                    <input
                      type="text"
                      value={colorsInput}
                      onChange={(e) => setColorsInput(e.target.value)}
                      className="w-full bg-input border border-border text-foreground rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateMatrix}
                  className="py-2 px-4 rounded-xl bg-card border border-border text-foreground font-bold text-xs hover:bg-muted"
                >
                  Generate Matrix Combos
                </button>

                {generatedVariants.length > 0 && (
                  <div className="text-[11px] font-mono text-emerald-400">
                    ✓ Generated {generatedVariants.length} variant combinations!
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="py-3 px-5 rounded-2xl border border-border text-foreground font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-2xl bg-primary text-primary-fg font-extrabold text-xs shadow-glow"
              >
                Save Product & Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
