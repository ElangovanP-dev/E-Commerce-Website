import { PrismaClient, Role, DiscountType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

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
      email: 'admin@luxurystore.com',
      passwordHash: adminPassword,
      name: 'Alexander Vance (Admin)',
      role: Role.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
  })

  const customer = await prisma.user.create({
    data: {
      email: 'customer@luxurystore.com',
      passwordHash: customerPassword,
      name: 'Elena Rostova',
      role: Role.CUSTOMER,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
  })

  console.log('✅ Created Admin and Customer users')

  // 2. Create Default Addresses
  await prisma.address.create({
    data: {
      userId: customer.id,
      type: 'shipping',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62704',
      country: 'United States',
      isDefault: true,
    },
  })

  // 3. Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME20',
        discountType: DiscountType.PERCENTAGE,
        value: 20,
        minSpend: 50,
        maxUses: 500,
        usedCount: 12,
        isActive: true,
      },
      {
        code: 'SAVE50',
        discountType: DiscountType.FIXED,
        value: 50,
        minSpend: 200,
        maxUses: 100,
        usedCount: 5,
        isActive: true,
      },
      {
        code: 'VIPSUMMER',
        discountType: DiscountType.PERCENTAGE,
        value: 30,
        minSpend: 150,
        maxUses: 50,
        usedCount: 2,
        isActive: true,
      },
    ],
  })

  console.log('✅ Created Coupons')

  // 4. Create Categories
  const categoriesData = [
    {
      name: 'Cyber & Audio Tech',
      slug: 'audio-tech',
      description: 'High-fidelity audio gear, noise-canceling headphones, and futuristic desk accessories.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Minimalist Apparel',
      slug: 'apparel',
      description: 'Tailored organic cotton garments, heavyweight hoodies, and modern luxury essentials.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Horology & Timepieces',
      slug: 'timepieces',
      description: 'Precision mechanical chronographs, sapphire crystal watches, and premium straps.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Japandi Home Living',
      slug: 'home-living',
      description: 'Travertine stone ceramics, bamboo diffusers, and warm artisanal furniture.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Luxury Carry & Bags',
      slug: 'carry-bags',
      description: 'Full-grain Italian leather duffels, waterproof modular backpacks, and sleek cardholders.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const categories = []
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat })
    categories.push(created)
  }

  console.log('✅ Created 5 Categories')

  // 5. Create 25+ Products with Variants and Reviews
  const productsData = [
    // Category 0: Audio Tech
    {
      title: 'Aura ANC Wireless Studio Headphones',
      slug: 'aura-anc-wireless-studio-headphones',
      description: 'Experience studio-grade acoustics with active noise cancellation, 40-hour battery life, titanium drivers, and custom EQ tuning.',
      basePrice: 349.99,
      salePrice: 299.99,
      sku: 'TECH-AUD-001',
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 45,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Matte Obsidian', size: 'Standard', price: 299.99, stockQuantity: 25, sku: 'TECH-AUD-001-BLK' },
        { color: 'Arctic Ice Silver', size: 'Standard', price: 299.99, stockQuantity: 20, sku: 'TECH-AUD-001-SLV' },
      ]
    },
    {
      title: 'SonicPulse Transparent Bluetooth Speaker',
      slug: 'sonicpulse-transparent-bluetooth-speaker',
      description: 'Hand-crafted tempered glass housing with passive bass radiators and atmospheric ambient RGB lighting.',
      basePrice: 199.99,
      salePrice: 169.99,
      sku: 'TECH-AUD-002',
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 30,
      rating: 4.7,
      isFeatured: false,
      variants: [
        { color: 'Clear Glass', size: 'Medium', price: 169.99, stockQuantity: 15, sku: 'TECH-AUD-002-CLR' },
        { color: 'Smoked Quartz', size: 'Medium', price: 179.99, stockQuantity: 15, sku: 'TECH-AUD-002-SMK' },
      ]
    },
    {
      title: 'Vortex Mechanical Cyber Keypad',
      slug: 'vortex-mechanical-cyber-keypad',
      description: 'Hot-swappable tactile switches, CNC aluminum chassis, programmable OLED screen, and per-key RGB backlighting.',
      basePrice: 189.99,
      salePrice: null,
      sku: 'TECH-ACC-003',
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 18,
      rating: 4.8,
      isFeatured: true,
      variants: [
        { color: 'Cyber Purple', size: 'Compact 75%', price: 189.99, stockQuantity: 10, sku: 'TECH-ACC-003-PUR' },
        { color: 'Stealth Grey', size: 'Compact 75%', price: 189.99, stockQuantity: 8, sku: 'TECH-ACC-003-GRY' },
      ]
    },
    {
      title: 'NeonBeam MagSafe Wireless Dock',
      slug: 'neonbeam-magsafe-wireless-dock',
      description: 'Triple-device fast charging pad crafted from solid aerospace aluminum with soft neon ambient glowing rim.',
      basePrice: 99.99,
      salePrice: 79.99,
      sku: 'TECH-ACC-004',
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1622445268465-8438165a2683?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 60,
      rating: 4.6,
      isFeatured: false,
      variants: [
        { color: 'Midnight Black', size: '3-in-1', price: 79.99, stockQuantity: 30, sku: 'TECH-ACC-004-BLK' },
        { color: 'Silver Slate', size: '3-in-1', price: 79.99, stockQuantity: 30, sku: 'TECH-ACC-004-SLV' },
      ]
    },
    {
      title: 'AeroBuds Pro Spatial Audio In-Ear',
      slug: 'aerobuds-pro-spatial-audio-in-ear',
      description: 'Ultra-lightweight ergonomic earbuds with dynamic head tracking, IPX5 water resistance, and crystal-clear mic beamforming.',
      basePrice: 229.99,
      salePrice: 199.99,
      sku: 'TECH-AUD-005',
      categoryId: categories[0].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 40,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Chalk White', size: 'Universal Fit', price: 199.99, stockQuantity: 20, sku: 'TECH-AUD-005-WHT' },
        { color: 'Jet Black', size: 'Universal Fit', price: 199.99, stockQuantity: 20, sku: 'TECH-AUD-005-BLK' },
      ]
    },

    // Category 1: Apparel
    {
      title: 'Monolith 500GSM Heavyweight Oversized Hoodie',
      slug: 'monolith-500gsm-heavyweight-oversized-hoodie',
      description: 'Custom milled 100% organic French terry cotton with drop shoulder silhouette, double-layered hood, and zero drawstrings.',
      basePrice: 140.00,
      salePrice: 115.00,
      sku: 'APP-HOOD-001',
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 75,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Washed Charcoal', size: 'M', price: 115.00, stockQuantity: 25, sku: 'APP-HOOD-001-CHAR-M' },
        { color: 'Washed Charcoal', size: 'L', price: 115.00, stockQuantity: 25, sku: 'APP-HOOD-001-CHAR-L' },
        { color: 'Sand Beige', size: 'L', price: 115.00, stockQuantity: 25, sku: 'APP-HOOD-001-SND-L' },
      ]
    },
    {
      title: 'Nordic Raw Selvedge Japanese Denim',
      slug: 'nordic-raw-selvedge-japanese-denim',
      description: '14.5oz loomstate Kuroki Mill shuttle loom denim with custom copper hardware and vintage red line selvedge ID.',
      basePrice: 220.00,
      salePrice: null,
      sku: 'APP-DNM-002',
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 35,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Indigo Raw', size: '30x32', price: 220.00, stockQuantity: 15, sku: 'APP-DNM-002-30' },
        { color: 'Indigo Raw', size: '32x32', price: 220.00, stockQuantity: 20, sku: 'APP-DNM-002-32' },
      ]
    },
    {
      title: 'Minimalist Essential Bamboo Crew Tee',
      slug: 'minimalist-essential-bamboo-crew-tee',
      description: 'Ultra-soft viscose bamboo and Pima cotton blend featuring anti-microbial breathability and tailored side seam slits.',
      basePrice: 55.00,
      salePrice: 45.00,
      sku: 'APP-TEE-003',
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 120,
      rating: 4.7,
      isFeatured: false,
      variants: [
        { color: 'Chalk White', size: 'M', price: 45.00, stockQuantity: 40, sku: 'APP-TEE-003-WHT-M' },
        { color: 'Chalk White', size: 'L', price: 45.00, stockQuantity: 40, sku: 'APP-TEE-003-WHT-L' },
        { color: 'Deep Olive', size: 'L', price: 45.00, stockQuantity: 40, sku: 'APP-TEE-003-OLV-L' },
      ]
    },
    {
      title: 'Artisanal Cashmere Knit Sweater',
      slug: 'artisanal-cashmere-knit-sweater',
      description: '100% Grade-A Mongolian cashmere 12-gauge knit with ribbed collar and seamless raglan sleeves.',
      basePrice: 380.00,
      salePrice: 320.00,
      sku: 'APP-KNIT-004',
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 20,
      rating: 5.0,
      isFeatured: true,
      variants: [
        { color: 'Camel Tan', size: 'M', price: 320.00, stockQuantity: 10, sku: 'APP-KNIT-004-CAM-M' },
        { color: 'Oatmeal', size: 'L', price: 320.00, stockQuantity: 10, sku: 'APP-KNIT-004-OAT-L' },
      ]
    },
    {
      title: 'Cyberpunk Waterproof Techwear Parka',
      slug: 'cyberpunk-waterproof-techwear-parka',
      description: '3-layer Gore-Tex membrane, taped seams, magnetic storm flap, and integrated crossbody carry strap system.',
      basePrice: 450.00,
      salePrice: 395.00,
      sku: 'APP-JKT-005',
      categoryId: categories[1].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 15,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Stealth Black', size: 'L', price: 395.00, stockQuantity: 8, sku: 'APP-JKT-005-BLK-L' },
        { color: 'Neon Cyber Blue', size: 'L', price: 395.00, stockQuantity: 7, sku: 'APP-JKT-005-BLU-L' },
      ]
    },

    // Category 2: Horology & Timepieces
    {
      title: 'Aethelgard Automatic Skeleton Chronograph',
      slug: 'aethelgard-automatic-skeleton-chronograph',
      description: 'Swiss-made ETA 2824 movement visible through dual sapphire crystal domes, 316L stainless steel case, and exhibition case back.',
      basePrice: 1250.00,
      salePrice: 990.00,
      sku: 'TIME-AUTO-001',
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 10,
      rating: 5.0,
      isFeatured: true,
      variants: [
        { color: 'Rose Gold & Leather', size: '42mm', price: 990.00, stockQuantity: 5, sku: 'TIME-001-RGLD' },
        { color: 'Silver Steel & Mesh', size: '42mm', price: 990.00, stockQuantity: 5, sku: 'TIME-001-SLV' },
      ]
    },
    {
      title: 'Vanguard Titanium Diver Watch 300m',
      slug: 'vanguard-titanium-diver-watch-300m',
      description: 'Grade 5 titanium casing, ceramic unidirectional rotating bezel, Super-LumiNova BGW9 indices, and helium escape valve.',
      basePrice: 850.00,
      salePrice: 750.00,
      sku: 'TIME-DIV-002',
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 12,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Abyss Teal', size: '40mm', price: 750.00, stockQuantity: 6, sku: 'TIME-DIV-002-TEL' },
        { color: 'Deep Black', size: '40mm', price: 750.00, stockQuantity: 6, sku: 'TIME-DIV-002-BLK' },
      ]
    },
    {
      title: 'Chronos Minimalist Sapphire Slim Edition',
      slug: 'chronos-minimalist-sapphire-slim-edition',
      description: 'Ultra-thin 6mm quartz profile with scratch-proof sapphire crystal and vegetable-tanned Horween leather strap.',
      basePrice: 280.00,
      salePrice: 220.00,
      sku: 'TIME-SLM-003',
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 25,
      rating: 4.7,
      isFeatured: false,
      variants: [
        { color: 'Gold Dial', size: '38mm', price: 220.00, stockQuantity: 12, sku: 'TIME-SLM-003-GLD' },
        { color: 'Black Dial', size: '38mm', price: 220.00, stockQuantity: 13, sku: 'TIME-SLM-003-BLK' },
      ]
    },
    {
      title: 'Solaris Eco-Tough Solar Field Watch',
      slug: 'solaris-eco-tough-solar-field-watch',
      description: 'Infinite battery charged by indoor and outdoor light, matte tactical olive dial, and reinforced NATO ballistic strap.',
      basePrice: 195.00,
      salePrice: null,
      sku: 'TIME-FLD-004',
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 30,
      rating: 4.6,
      isFeatured: false,
      variants: [
        { color: 'Tactical Olive', size: '40mm', price: 195.00, stockQuantity: 15, sku: 'TIME-FLD-004-OLV' },
        { color: 'Desert Tan', size: '40mm', price: 195.00, stockQuantity: 15, sku: 'TIME-FLD-004-TAN' },
      ]
    },
    {
      title: 'Orbital Tourbillon Limited Prototype',
      slug: 'orbital-tourbillon-limited-prototype',
      description: 'Hand-wound mechanical tourbillon cage rotating every 60 seconds with 80-hour power reserve indicator.',
      basePrice: 3500.00,
      salePrice: 2950.00,
      sku: 'TIME-LUX-005',
      categoryId: categories[2].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 3,
      rating: 5.0,
      isFeatured: true,
      variants: [
        { color: '24k Gold Accents', size: '44mm', price: 2950.00, stockQuantity: 3, sku: 'TIME-LUX-005-GLD' },
      ]
    },

    // Category 3: Japandi Home Living
    {
      title: 'Kyoto Hand-Carved Travertine Stone Lamp',
      slug: 'kyoto-hand-carved-travertine-stone-lamp',
      description: 'Solid natural beige travertine base paired with an unbleached linen drum shade. Emanates warm dimmable 2700K ambient light.',
      basePrice: 260.00,
      salePrice: 225.00,
      sku: 'HOME-LMP-001',
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 14,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Natural Travertine', size: '18 Inch', price: 225.00, stockQuantity: 14, sku: 'HOME-LMP-001-NAT' },
      ]
    },
    {
      title: 'Zenith Organic Ceramic Teapot & Cup Set',
      slug: 'zenith-organic-ceramic-teapot-cup-set',
      description: 'Hand-thrown stoneware clay with matte reactive speckling glaze. Includes 800ml teapot with bamboo handle and 4 matching cups.',
      basePrice: 110.00,
      salePrice: 95.00,
      sku: 'HOME-TEA-002',
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 22,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Matte Matcha Green', size: 'Set of 5', price: 95.00, stockQuantity: 11, sku: 'HOME-TEA-002-GRN' },
        { color: 'Smoked Charcoal', size: 'Set of 5', price: 95.00, stockQuantity: 11, sku: 'HOME-TEA-002-BLK' },
      ]
    },
    {
      title: 'Osaka Ultrasonics Ultrasonic Waterless Essential Diffuser',
      slug: 'osaka-ultrasonics-waterless-essential-diffuser',
      description: 'Cold-air atomizing technology diffusing pure essential oils directly without water heat breakdown.',
      basePrice: 145.00,
      salePrice: null,
      sku: 'HOME-DIF-003',
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 19,
      rating: 4.7,
      isFeatured: false,
      variants: [
        { color: 'Walnut Wood Base', size: 'Standard', price: 145.00, stockQuantity: 10, sku: 'HOME-DIF-003-WAL' },
        { color: 'Ash Wood Base', size: 'Standard', price: 145.00, stockQuantity: 9, sku: 'HOME-DIF-003-ASH' },
      ]
    },
    {
      title: 'Botanical Woven Wool Area Rug 6x9',
      slug: 'botanical-woven-wool-area-rug-6x9',
      description: 'New Zealand un-dyed organic wool hand-tufted with low pile architectural linear patterns.',
      basePrice: 620.00,
      salePrice: 540.00,
      sku: 'HOME-RUG-004',
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 8,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Cream Linen', size: '6x9 ft', price: 540.00, stockQuantity: 4, sku: 'HOME-RUG-004-CRM' },
        { color: 'Sage Green', size: '6x9 ft', price: 540.00, stockQuantity: 4, sku: 'HOME-RUG-004-SAG' },
      ]
    },
    {
      title: 'Minimalist Solid Oak Bedside Nightstand',
      slug: 'minimalist-solid-oak-bedside-nightstand',
      description: 'Sustainably harvested White Oak featuring soft-close drawer tracks, brass pull hardware, and integrated cable routing slot.',
      basePrice: 340.00,
      salePrice: 290.00,
      sku: 'HOME-FUR-005',
      categoryId: categories[3].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 10,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Natural White Oak', size: 'Standard', price: 290.00, stockQuantity: 5, sku: 'HOME-FUR-005-OAK' },
        { color: 'Ebonized Black Oak', size: 'Standard', price: 290.00, stockQuantity: 5, sku: 'HOME-FUR-005-BLK' },
      ]
    },

    // Category 4: Luxury Carry & Bags
    {
      title: 'Vanguard Full-Grain Italian Leather Weekender Duffel',
      slug: 'vanguard-full-grain-italian-leather-weekender-duffel',
      description: 'Handcrafted Tuscan vegetable-tanned cowhide, solid brass YKK Excella zippers, separate ventilated shoe compartment, and padded 16-inch laptop pocket.',
      basePrice: 580.00,
      salePrice: 490.00,
      sku: 'BAG-DUF-001',
      categoryId: categories[4].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 16,
      rating: 5.0,
      isFeatured: true,
      variants: [
        { color: 'Cognac Brown', size: '45L', price: 490.00, stockQuantity: 8, sku: 'BAG-DUF-001-COG' },
        { color: 'Espresso Black', size: '45L', price: 490.00, stockQuantity: 8, sku: 'BAG-DUF-001-BLK' },
      ]
    },
    {
      title: 'Modular Waterproof Roll-Top Commuter Backpack',
      slug: 'modular-waterproof-roll-top-commuter-backpack',
      description: '1000D Cordura nylon construction, Fidlock magnetic buckles, quick-access TSA laptop sleeve, and expandable water bottle pouch.',
      basePrice: 210.00,
      salePrice: 185.00,
      sku: 'BAG-BPK-002',
      categoryId: categories[4].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 28,
      rating: 4.9,
      isFeatured: false,
      variants: [
        { color: 'Matte Stealth Black', size: '28L', price: 185.00, stockQuantity: 14, sku: 'BAG-BPK-002-BLK' },
        { color: 'Storm Grey', size: '28L', price: 185.00, stockQuantity: 14, sku: 'BAG-BPK-002-GRY' },
      ]
    },
    {
      title: 'Aero Slim RFID Aluminum Cardholder Wallet',
      slug: 'aero-slim-rfid-aluminum-cardholder-wallet',
      description: 'Instant quick-trigger card ejection mechanism, holds up to 10 cards + cash clip, blocking 13.56 MHz RFID scanning.',
      basePrice: 75.00,
      salePrice: 59.99,
      sku: 'BAG-WLT-003',
      categoryId: categories[4].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 65,
      rating: 4.8,
      isFeatured: false,
      variants: [
        { color: 'Gunmetal Titanium', size: 'Ultra Slim', price: 59.99, stockQuantity: 35, sku: 'BAG-WLT-003-GUN' },
        { color: '24k Gold Trim', size: 'Ultra Slim', price: 69.99, stockQuantity: 30, sku: 'BAG-WLT-003-GLD' },
      ]
    },
    {
      title: 'Studio Leather Crossbody Sling Bag',
      slug: 'studio-leather-crossbody-sling-bag',
      description: 'Streamlined unstructured leather sling for daily tech EDC, passport, and tablet storage with adjustable seatbelt webbing strap.',
      basePrice: 160.00,
      salePrice: 135.00,
      sku: 'BAG-SLG-004',
      categoryId: categories[4].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 20,
      rating: 4.7,
      isFeatured: true,
      variants: [
        { color: 'Saddle Tan', size: 'Compact 5L', price: 135.00, stockQuantity: 10, sku: 'BAG-SLG-004-TAN' },
        { color: 'Ink Black', size: 'Compact 5L', price: 135.00, stockQuantity: 10, sku: 'BAG-SLG-004-BLK' },
      ]
    },
    {
      title: 'Exec Titanium Frame Rolling Carry-On Suitcase',
      slug: 'exec-titanium-frame-rolling-carry-on-suitcase',
      description: 'Unbreakable polycarbonate shell with integrated TSA combination locks, 360-degree silent Japanese Hinomoto spinner wheels, and compression divider.',
      basePrice: 420.00,
      salePrice: 360.00,
      sku: 'BAG-LUG-005',
      categoryId: categories[4].id,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1565026057447-b8899f2911a8?auto=format&fit=crop&w=1000&q=80',
      ]),
      stock: 12,
      rating: 4.9,
      isFeatured: true,
      variants: [
        { color: 'Brushed Charcoal', size: '21 Inch Carry-On', price: 360.00, stockQuantity: 6, sku: 'BAG-LUG-005-CHR' },
        { color: 'Champagne Silver', size: '21 Inch Carry-On', price: 360.00, stockQuantity: 6, sku: 'BAG-LUG-005-SLV' },
      ]
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

    // Create Sample Reviews
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userId: customer.id,
        rating: 5,
        title: 'Exceptional Quality & Design',
        comment: `Extremely satisfied with the ${createdProduct.title}. Build quality is premium and delivery was remarkably fast!`,
        isVerifiedPurchase: true,
      },
    })
  }

  console.log('✅ Created 25+ Products with Variants and Reviews')
  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
