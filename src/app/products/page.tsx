import { ProductGrid } from '@/components/common/ProductGrid'
import { FilterSidebar } from '@/components/common/FilterSidebar'

export const metadata = {
  title: 'All Handcrafted Products | VEDA & CO.',
  description: 'Explore authentic Indian heritage brassware, Pashmina wool shawls, sandalwood scents, Banarasi silk kurtas, and handcrafted leather duffels.',
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
            Festive Heritage Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F2C59]">
            All Handcrafted Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing 100% authentic artisan products directly sourced from traditional crafting centers across India.
          </p>
        </div>

        {/* Product Catalog Grid */}
        <ProductGrid />

        {/* Filter Drawer */}
        <FilterSidebar />
      </div>
    </main>
  )
}
