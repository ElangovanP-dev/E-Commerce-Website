import { notFound } from 'next/navigation'
import { ImageGallery } from '@/components/pdp/ImageGallery'
import { SizeGuideModal } from '@/components/pdp/SizeGuideModal'
import { FrequentlyBoughtTogether } from '@/components/pdp/FrequentlyBoughtTogether'
import { ReviewsSection } from '@/components/pdp/ReviewsSection'
import { ProductClientDetails } from '@/components/pdp/ProductClientDetails'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

const MOCK_PRODUCTS: Record<string, Product> = {
  'aura-anc-wireless-studio-headphones': {
    id: 'p1',
    title: 'Aura ANC Wireless Studio Headphones',
    slug: 'aura-anc-wireless-studio-headphones',
    description: 'Experience studio-grade acoustics with active noise cancellation, 40-hour battery life, titanium drivers, and custom EQ tuning.',
    basePrice: 349.99,
    salePrice: 299.99,
    sku: 'TECH-AUD-001',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Audio Tech', slug: 'audio-tech' },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 45,
    rating: 4.9,
    isFeatured: true,
    variants: [
      { id: 'v1', productId: 'p1', color: 'Matte Obsidian', size: 'Standard', price: 299.99, stockQuantity: 25, sku: 'TECH-AUD-001-BLK' },
      { id: 'v2', productId: 'p1', color: 'Arctic Ice Silver', size: 'Standard', price: 299.99, stockQuantity: 20, sku: 'TECH-AUD-001-SLV' },
    ],
  },
  'aethelgard-automatic-skeleton-chronograph': {
    id: 'p2',
    title: 'Aethelgard Automatic Skeleton Chronograph',
    slug: 'aethelgard-automatic-skeleton-chronograph',
    description: 'Swiss-made ETA 2824 movement visible through dual sapphire crystal domes, 316L stainless steel case, and exhibition case back.',
    basePrice: 1250.00,
    salePrice: 990.00,
    sku: 'TIME-AUTO-001',
    categoryId: 'c2',
    category: { id: 'c2', name: 'Horology', slug: 'timepieces' },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 10,
    rating: 5.0,
    isFeatured: true,
    variants: [
      { id: 'v3', productId: 'p2', color: 'Rose Gold & Leather', size: '42mm', price: 990.00, stockQuantity: 5, sku: 'TIME-001-RGLD' },
    ],
  },
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  let product: Product | null = MOCK_PRODUCTS[slug] || null

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        reviews: { include: { user: true } },
      },
    })
    if (dbProduct) {
      product = {
        ...dbProduct,
        images: JSON.parse(dbProduct.images as string),
      } as Product
    }
  } catch (e) {
    console.warn('Prisma DB query fallback to mock product:', e)
  }

  if (!product) {
    // Fallback default product so page never breaks
    product = MOCK_PRODUCTS['aura-anc-wireless-studio-headphones']
  }

  const images = Array.isArray(product.images)
    ? product.images
    : JSON.parse(product.images || '[]')

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Gallery & Client Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <ImageGallery images={images} />
          </div>

          <div className="lg:col-span-6">
            <ProductClientDetails product={product} />
          </div>
        </div>

        {/* Frequently Bought Together Bundle Builder */}
        <FrequentlyBoughtTogether
          mainProduct={product}
          bundleProducts={Object.values(MOCK_PRODUCTS).filter((p) => p.id !== product.id)}
        />

        {/* Customer Reviews Section */}
        <ReviewsSection reviews={product.reviews || []} />
      </div>
    </main>
  )
}
