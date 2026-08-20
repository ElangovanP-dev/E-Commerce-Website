export type ThemeId =
  | 'midnight-obsidian'
  | 'nordic-frost'
  | 'emerald-botanical'
  | 'sunset-terracotta'
  | 'cyber-neon'
  | 'sandstone-japandi'
  | 'deep-ocean-abyss'
  | 'classic-editorial'

export interface ThemeConfig {
  id: ThemeId
  name: string
  subtitle: string
  bgHex: string
  accentHex: string
  primaryHex: string
  isDark: boolean
}

export interface UserSession {
  id: string
  email: string
  name: string
  role: 'CUSTOMER' | 'ADMIN'
  avatar?: string | null
}

export interface ProductVariant {
  id: string
  productId: string
  size?: string | null
  color?: string | null
  sku: string
  price: number
  stockQuantity: number
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  images?: string[] | null
  isVerifiedPurchase: boolean
  createdAt: string | Date
  user?: {
    name: string
    avatar?: string | null
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  basePrice: number
  salePrice?: number | null
  sku: string
  categoryId: string
  category?: Category
  images: string[] // Parsed array of URLs
  stock: number
  rating: number
  isFeatured: boolean
  variants?: ProductVariant[]
  reviews?: ProductReview[]
  createdAt?: string | Date
}

export interface CartItem {
  id: string // unique cart item id (product.id + variant.id)
  product: Product
  selectedVariant?: ProductVariant | null
  selectedColor?: string
  selectedSize?: string
  quantity: number
  unitPrice: number
}

export interface WishlistItem {
  id: string
  productId: string
  product: Product
  createdAt: string | Date
}

export interface FilterState {
  searchQuery: string
  categoryId: string | null
  minPrice: number
  maxPrice: number
  minRating: number
  inStockOnly: boolean
  selectedSizes: string[]
  selectedColors: string[]
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'top-rated'
}

export interface Coupon {
  id: string
  code: string
  discountType: 'PERCENTAGE' | 'FIXED'
  value: number
  minSpend: number
  maxUses: number
  usedCount: number
  expiresAt?: string | Date | null
  isActive: boolean
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  variantId?: string | null
  variant?: ProductVariant | null
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  orderNumber: string
  userId?: string | null
  user?: {
    name: string
    email: string
  } | null
  items: OrderItem[]
  subtotal: number
  tax: number
  shippingFee: number
  discount: number
  total: number
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentStatus: string
  stripePaymentIntentId?: string | null
  shippingAddress: {
    fullName: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  trackingNumber?: string | null
  createdAt: string | Date
}
