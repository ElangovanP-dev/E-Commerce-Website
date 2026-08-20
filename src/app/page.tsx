import { HeroSection } from '@/components/common/HeroSection'
import { CategoryGrid } from '@/components/common/CategoryGrid'
import { ProductGrid } from '@/components/common/ProductGrid'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Jodhpur Hand-Carved Sheesham Wood Accent Table',
    slug: 'jodhpur-hand-carved-sheesham-wood-accent-table',
    description: 'Intricately hand-engraved accent table carved by master artisans in Jodhpur from seasoned solid Sheesham wood.',
    basePrice: 10999,
    salePrice: 8499,
    sku: 'VEDA-HOM-001',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Heritage Home & Brass', slug: 'home-decor' },
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 18,
    rating: 4.9,
    isFeatured: true,
    variants: [
      { id: 'v1', productId: 'p1', color: 'Walnut Stain', size: 'Standard (18x18 in)', price: 8499, stockQuantity: 10, sku: 'VEDA-HOM-001-WAL' },
    ],
  },
  {
    id: 'p2',
    title: 'Pure Hand-Woven Kashmiri Pashmina Wool Shawl',
    slug: 'pure-hand-woven-kashmiri-pashmina-wool-shawl',
    description: 'Woven on traditional handlooms in Srinagar using 100% certified Changthangi Pashmina cashmere with Sozni needlework.',
    basePrice: 14999,
    salePrice: 12500,
    sku: 'VEDA-APP-002',
    categoryId: 'c2',
    category: { id: 'c2', name: 'Handcrafted Silk & Apparel', slug: 'apparel' },
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 12,
    rating: 5.0,
    isFeatured: true,
    variants: [
      { id: 'v2', productId: 'p2', color: 'Royal Ivory', size: '200 x 100 cm', price: 12500, stockQuantity: 6, sku: 'VEDA-APP-002-IVR' },
    ],
  },
  {
    id: 'p3',
    title: 'Mysore Sandalwood & Oud Ceramic Reed Diffuser',
    slug: 'mysore-sandalwood-oud-ceramic-reed-diffuser',
    description: 'Hand-cast terracotta ceramic bottle filled with organic steam-distilled Mysore Sandalwood and aged Assam Oud.',
    basePrice: 2499,
    salePrice: 1899,
    sku: 'VEDA-WELL-003',
    categoryId: 'c3',
    category: { id: 'c3', name: 'Artisanal Scents & Wellness', slug: 'wellness' },
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 45,
    rating: 4.8,
    isFeatured: false,
  },
  {
    id: 'p4',
    title: 'Varanasi Pure Raw Mulberry Silk Kurta Set',
    slug: 'varanasi-pure-raw-mulberry-silk-kurta-set',
    description: 'Tailored 100% Varanasi Banarasi mulberry raw silk kurta with hand-detailed mandarin collar and matching pyjama.',
    basePrice: 5499,
    salePrice: 4299,
    sku: 'VEDA-APP-004',
    categoryId: 'c2',
    category: { id: 'c2', name: 'Handcrafted Silk & Apparel', slug: 'apparel' },
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 25,
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: 'p5',
    title: 'Moradabad Antique Engraved Pure Brass Urli Bowl',
    slug: 'moradabad-antique-engraved-pure-brass-urli-bowl',
    description: 'Traditional decorative brass urli bowl crafted in Moradabad with floral mandala engravings.',
    basePrice: 2899,
    salePrice: 2199,
    sku: 'VEDA-HOM-005',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Heritage Home & Brass', slug: 'home-decor' },
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 30,
    rating: 4.7,
    isFeatured: false,
  },
  {
    id: 'p6',
    title: 'Himalayan Handcrafted Full-Grain Leather Weekender Duffel',
    slug: 'himalayan-handcrafted-full-grain-leather-weekender-duffel',
    description: 'Vegetable-tanned full-grain buffalo leather duffel bag with antique brass fittings and canvas lining.',
    basePrice: 8999,
    salePrice: 6999,
    sku: 'VEDA-LEA-006',
    categoryId: 'c4',
    category: { id: 'c4', name: 'Premium Leather & Carry', slug: 'leather-bags' },
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 14,
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: 'p7',
    title: 'Kannauj Traditional Gulab & Vetiver Pure Attar (12ml)',
    slug: 'kannauj-traditional-gulab-vetiver-pure-attar-12ml',
    description: 'Distilled using the ancient Deg-Bhapka hydro-distillation method in Kannauj from damask roses and Khus vetiver.',
    basePrice: 1999,
    salePrice: 1499,
    sku: 'VEDA-WELL-007',
    categoryId: 'c3',
    category: { id: 'c3', name: 'Artisanal Scents & Wellness', slug: 'wellness' },
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 50,
    rating: 4.8,
    isFeatured: false,
  },
  {
    id: 'p8',
    title: 'Kolkata Hand-Tooled Vegetable Tanned Leather Messenger Bag',
    slug: 'kolkata-hand-tooled-vegetable-tanned-leather-messenger-bag',
    description: 'Structured laptop messenger bag hand-stitched in Kolkata from 100% full-grain leather for 15.6-inch laptops.',
    basePrice: 4599,
    salePrice: 3799,
    sku: 'VEDA-LEA-008',
    categoryId: 'c4',
    category: { id: 'c4', name: 'Premium Leather & Carry', slug: 'leather-bags' },
    images: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
    ],
    stock: 20,
    rating: 4.8,
    isFeatured: true,
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
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <CategoryGrid />
      <ProductGrid products={products} />
    </main>
  )
}
