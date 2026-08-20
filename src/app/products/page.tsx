import { ProductGrid } from '@/components/common/ProductGrid'
import { FilterSidebar } from '@/components/common/FilterSidebar'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

export const metadata = {
  title: 'All Handcrafted Products | VEDA & CO.',
  description: 'Explore authentic Indian heritage brassware, Pashmina wool shawls, sandalwood scents, Banarasi silk kurtas, and handcrafted leather duffels.',
}

export default async function ProductsPage() {
  let products: Product[] = []
  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
      take: 50,
    })
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        ...p,
        images: JSON.parse(p.images as string),
      })) as Product[]
    }
  } catch (e) {
    console.warn('Prisma products query fallback:', e)
  }

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
        <ProductGrid products={products} />

        {/* Filter Drawer */}
        <FilterSidebar />
      </div>
    </main>
  )
}
