import { PrismaClient, Role, DiscountType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting VEDA & CO. database seeding...')

  // Clear existing data
  await prisma.wishlistItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.user.deleteMany()

  // Hash password
  const adminPassword = await bcrypt.hash('admin123', 10)
  const customerPassword = await bcrypt.hash('customer123', 10)

  // 1. Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@vedaco.in',
      passwordHash: adminPassword,
      name: 'Aditya Sharma (Admin)',
      role: Role.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  })

  const customer = await prisma.user.create({
    data: {
      email: 'customer@vedaco.in',
      passwordHash: customerPassword,
      name: 'Priya Iyer',
      role: Role.CUSTOMER,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
  })

  console.log('✅ Created Admin and Customer users')

  // 2. Create Default Addresses
  await prisma.address.create({
    data: {
      userId: customer.id,
      type: 'shipping',
      street: '42 Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      isDefault: true,
    },
  })

  // 3. Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'UTSAV20',
        discountType: DiscountType.FIXED,
        value: 1500,
        minSpend: 4999,
        maxUses: 1000,
        usedCount: 45,
        isActive: true,
      },
      {
        code: 'WELCOME10',
        discountType: DiscountType.PERCENTAGE,
        value: 10,
        minSpend: 999,
        maxUses: 500,
        usedCount: 18,
        isActive: true,
      },
      {
        code: 'FESTIVE500',
        discountType: DiscountType.FIXED,
        value: 500,
        minSpend: 2499,
        maxUses: 200,
        usedCount: 12,
        isActive: true,
      },
    ],
  })

  console.log('✅ Created Coupons')

  // 4. Create Categories
  const categoriesData = [
    {
      name: 'Heritage Home & Brass',
      slug: 'home-decor',
      description: 'Handcrafted Sheesham wood furniture, Moradabad antique brassware, and traditional decor.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Handcrafted Silk & Apparel',
      slug: 'apparel',
      description: 'Pure woven Kashmiri Pashmina shawls, Varanasi mulberry raw silk kurtas, and artisanal textiles.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Artisanal Scents & Wellness',
      slug: 'wellness',
      description: 'Kannauj traditional pure attars, Mysore sandalwood ceramics, and botanical essential oils.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Premium Leather & Carry',
      slug: 'leather-bags',
      description: 'Himalayan full-grain leather duffels, Kolkata vegetable-tanned messenger bags, and hand-tooled EDC.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const categoriesMap: Record<string, string> = {}
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categoriesMap[cat.slug] = created.id
  }

  console.log('✅ Created 4 Core Categories')

  // 5. Create Authentic Indian Products
  const productsData = [
    {
      title: 'Jodhpur Hand-Carved Sheesham Wood Accent Table',
      slug: 'jodhpur-hand-carved-sheesham-wood-accent-table',
      description: 'Intricately hand-engraved accent table carved by master artisans in Jodhpur from seasoned solid Sheesham wood. Finished with natural protective beeswax lacquer.',
      basePrice: 10999,
      salePrice: 8499,
      sku: 'VEDA-HOM-001',
      categoryId: categoriesMap['home-decor'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 18,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Walnut Stain', size: 'Standard (18x18 in)', price: 8499, stockQuantity: 10, sku: 'VEDA-HOM-001-WAL' },
        { color: 'Natural Honey', size: 'Standard (18x18 in)', price: 8499, stockQuantity: 8, sku: 'VEDA-HOM-001-HNY' },
      ],
    },
    {
      title: 'Pure Hand-Woven Kashmiri Pashmina Wool Shawl',
      slug: 'pure-hand-woven-kashmiri-pashmina-wool-shawl',
      description: 'Woven on traditional handlooms in Srinagar using 100% certified Changthangi Pashmina cashmere. Features delicate hand-embroidered Sozni needlework borders.',
      basePrice: 14999,
      salePrice: 12500,
      sku: 'VEDA-APP-002',
      categoryId: categoriesMap['apparel'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 12,
      rating: 5.0,
      isFeatured: true,
      variants: [
        { color: 'Royal Ivory & Crimson', size: '200 x 100 cm', price: 12500, stockQuantity: 6, sku: 'VEDA-APP-002-IVR' },
        { color: 'Midnight Indigo', size: '200 x 100 cm', price: 12500, stockQuantity: 6, sku: 'VEDA-APP-002-IND' },
      ],
    },
    {
      title: 'Mysore Sandalwood & Oud Ceramic Reed Diffuser',
      slug: 'mysore-sandalwood-oud-ceramic-reed-diffuser',
      description: 'Hand-cast terracotta ceramic bottle filled with organic steam-distilled Mysore Sandalwood and aged Assam Oud. Includes 8 rattan diffuser reeds.',
      basePrice: 2499,
      salePrice: 1899,
      sku: 'VEDA-WELL-003',
      categoryId: categoriesMap['wellness'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 45,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Terracotta Clay', size: '250 ml', price: 1899, stockQuantity: 25, sku: 'VEDA-WELL-003-TER' },
        { color: 'Smoked Charcoal', size: '250 ml', price: 1899, stockQuantity: 20, sku: 'VEDA-WELL-003-SMK' },
      ],
    },
    {
      title: 'Varanasi Pure Raw Mulberry Silk Kurta Set',
      slug: 'varanasi-pure-raw-mulberry-silk-kurta-set',
      description: 'Tailored 100% Varanasi Banarasi mulberry raw silk kurta with hand-detailed mandarin collar and matching silk pyjama trouser.',
      basePrice: 5499,
      salePrice: 4299,
      sku: 'VEDA-APP-004',
      categoryId: categoriesMap['apparel'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 25,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Saffron Gold', size: 'M (40)', price: 4299, stockQuantity: 8, sku: 'VEDA-APP-004-GLD-M' },
        { color: 'Saffron Gold', size: 'L (42)', price: 4299, stockQuantity: 10, sku: 'VEDA-APP-004-GLD-L' },
        { color: 'Emerald Green', size: 'L (42)', price: 4299, stockQuantity: 7, sku: 'VEDA-APP-004-EMR-L' },
      ],
    },
    {
      title: 'Moradabad Antique Engraved Pure Brass Urli Bowl',
      slug: 'moradabad-antique-engraved-pure-brass-urli-bowl',
      description: 'Traditional decorative brass urli bowl crafted in Moradabad. Hand-hammered with floral mandala engravings for floating flowers and tealight candles.',
      basePrice: 2899,
      salePrice: 2199,
      sku: 'VEDA-HOM-005',
      categoryId: categoriesMap['home-decor'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 30,
      rating: 4.7,
      isFeatured: false,
      variants: [
        { color: 'Antique Brass Gold', size: '12 Inch Diameter', price: 2199, stockQuantity: 15, sku: 'VEDA-HOM-005-12' },
        { color: 'Antique Brass Gold', size: '15 Inch Diameter', price: 2599, stockQuantity: 15, sku: 'VEDA-HOM-005-15' },
      ],
    },
    {
      title: 'Himalayan Handcrafted Full-Grain Leather Weekender Duffel',
      slug: 'himalayan-handcrafted-full-grain-leather-weekender-duffel',
      description: 'Vegetable-tanned full-grain buffalo leather duffel bag with antique brass fittings, cotton canvas lining, and separate shoe sleeve.',
      basePrice: 8999,
      salePrice: 6999,
      sku: 'VEDA-LEA-006',
      categoryId: categoriesMap['leather-bags'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 14,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Vintage Tan', size: '42L Capacity', price: 6999, stockQuantity: 7, sku: 'VEDA-LEA-006-TAN' },
        { color: 'Deep Mocha Brown', size: '42L Capacity', price: 6999, stockQuantity: 7, sku: 'VEDA-LEA-006-BRN' },
      ],
    },
    {
      title: 'Kannauj Traditional Gulab & Vetiver Pure Attar (12ml)',
      slug: 'kannauj-traditional-gulab-vetiver-pure-attar-12ml',
      description: 'Distilled using the ancient Deg-Bhapka hydro-distillation method in Kannauj from damask roses and Khus vetiver roots. 100% alcohol-free concentrated perfume oil.',
      basePrice: 1999,
      salePrice: 1499,
      sku: 'VEDA-WELL-007',
      categoryId: categoriesMap['wellness'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 50,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Crystal Glass Bottle', size: '12 ml', price: 1499, stockQuantity: 50, sku: 'VEDA-WELL-007-12ML' },
      ],
    },
    {
      title: 'Kolkata Hand-Tooled Vegetable Tanned Leather Messenger Bag',
      slug: 'kolkata-hand-tooled-vegetable-tanned-leather-messenger-bag',
      description: 'Structured laptop messenger bag hand-stitched in Kolkata from 100% full-grain leather. Accommodates 15.6-inch laptops with quick magnetic brass closures.',
      basePrice: 4599,
      salePrice: 3799,
      sku: 'VEDA-LEA-008',
      categoryId: categoriesMap['leather-bags'],
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 20,
      rating: 4.8,
      isFeatured: true,
      variants: [
        { color: 'Chestnut Brown', size: '15.6 in Laptop Size', price: 3799, stockQuantity: 10, sku: 'VEDA-LEA-008-BRN' },
        { color: 'Cognac Saddle', size: '15.6 in Laptop Size', price: 3799, stockQuantity: 10, sku: 'VEDA-LEA-008-COG' },
      ],
    },
  ]

  for (const item of productsData) {
    const { variants, ...prodData } = item
    const createdProduct = await prisma.product.create({
      data: prodData,
    })

    // Create Variants
    if (variants && variants.length > 0) {
      for (const v of variants) {
        await prisma.productVariant.create({
          data: {
            productId: createdProduct.id,
            ...v,
          },
        })
      }
    }

    // Create Sample Review
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userId: customer.id,
        rating: 5,
        title: 'Authentic Indian Craftsmanship',
        comment: `Extremely impressed by the authentic quality of ${createdProduct.title}. Packaging and delivery was remarkably fast!`,
        isVerifiedPurchase: true,
      },
    })
  }

  console.log('✅ Created 8 Core Indian Luxury Products')
  console.log('🎉 VEDA & CO. Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
