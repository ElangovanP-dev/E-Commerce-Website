import { HeroSection } from '@/components/common/HeroSection'
import { CategoryGrid } from '@/components/common/CategoryGrid'
import { ProductGrid } from '@/components/common/ProductGrid'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

// Mock products fallback to ensure instant rendering even during database initializations
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Aura ANC Wireless Studio Headphones',
    slug: 'aura-anc-wireless-studio-headphones',
    description: 'Studio-grade acoustics with active noise cancellation, 40-hour battery life, titanium drivers, and custom EQ tuning.',
    basePrice: 349.99,
    salePrice: 299.99,
    sku: 'TECH-AUD-001',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Audio Tech', slug: 'audio-tech' },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 45,
    rating: 4.9,
    isFeatured: true,
    variants: [
      { id: 'v1', productId: 'p1', color: 'Matte Obsidian', size: 'Standard', price: 299.99, stockQuantity: 25, sku: 'TECH-AUD-001-BLK' },
      { id: 'v2', productId: 'p1', color: 'Arctic Ice Silver', size: 'Standard', price: 299.99, stockQuantity: 20, sku: 'TECH-AUD-001-SLV' },
    ],
  },
  {
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
  {
    id: 'p3',
    title: 'Monolith 500GSM Heavyweight Hoodie',
    slug: 'monolith-500gsm-heavyweight-oversized-hoodie',
    description: 'Custom milled 100% organic French terry cotton with drop shoulder silhouette.',
    basePrice: 140.00,
    salePrice: 115.00,
    sku: 'APP-HOOD-001',
    categoryId: 'c3',
    category: { id: 'c3', name: 'Apparel', slug: 'apparel' },
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 75,
    rating: 4.9,
    isFeatured: true,
    variants: [
      { id: 'v4', productId: 'p3', color: 'Washed Charcoal', size: 'M', price: 115.00, stockQuantity: 25, sku: 'APP-HOOD-CHAR-M' },
    ],
  },
  {
    id: 'p4',
    title: 'Kyoto Hand-Carved Travertine Stone Lamp',
    slug: 'kyoto-hand-carved-travertine-stone-lamp',
    description: 'Solid natural beige travertine base paired with an unbleached linen drum shade.',
    basePrice: 260.00,
    salePrice: 225.00,
    sku: 'HOME-LMP-001',
    categoryId: 'c4',
    category: { id: 'c4', name: 'Japandi Living', slug: 'home-living' },
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 14,
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: 'p5',
    title: 'Vanguard Full-Grain Italian Leather Duffel',
    slug: 'vanguard-full-grain-italian-leather-weekender-duffel',
    description: 'Handcrafted Tuscan vegetable-tanned cowhide, solid brass YKK zippers.',
    basePrice: 580.00,
    salePrice: 490.00,
    sku: 'BAG-DUF-001',
    categoryId: 'c5',
    category: { id: 'c5', name: 'Carry & Bags', slug: 'carry-bags' },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 16,
    rating: 5.0,
    isFeatured: true,
  },
  {
    id: 'p6',
    title: 'SonicPulse Transparent Bluetooth Speaker',
    slug: 'sonicpulse-transparent-bluetooth-speaker',
    description: 'Hand-crafted tempered glass housing with passive bass radiators.',
    basePrice: 199.99,
    salePrice: 169.99,
    sku: 'TECH-AUD-002',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Audio Tech', slug: 'audio-tech' },
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 30,
    rating: 4.7,
    isFeatured: false,
  },
]

export default async function HomePage() {
  let products: Product[] = MOCK_PRODUCTS
  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
      take: 25,
    })
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        ...p,
        images: JSON.parse(p.images as string),
      })) as Product[]
    }
  } catch (e) {
    console.warn('Prisma DB query fallback to mock inventory:', e)
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <ProductGrid products={products} />
    </main>
  )
}
