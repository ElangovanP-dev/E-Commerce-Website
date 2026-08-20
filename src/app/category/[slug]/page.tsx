import { ProductGrid } from '@/components/common/ProductGrid'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

const CATEGORY_NAMES: Record<string, string> = {
  'audio-tech': 'Cyber & Audio Tech',
  'apparel': 'Minimalist Apparel',
  'timepieces': 'Horology & Timepieces',
  'home-living': 'Japandi Home Living',
  'carry-bags': 'Luxury Carry & Bags',
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const categoryTitle = CATEGORY_NAMES[slug] || 'Curated Category'

  let products: Product[] = []
  try {
    const dbCategory = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          include: { category: true, variants: true },
        },
      },
    })
    if (dbCategory && dbCategory.products) {
      products = dbCategory.products.map((p) => ({
        ...p,
        images: JSON.parse(p.images as string),
      })) as Product[]
    }
  } catch (e) {
    console.warn('Prisma category query fallback:', e)
  }

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border pb-6">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Collection Filter
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {categoryTitle}
          </h1>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  )
}
