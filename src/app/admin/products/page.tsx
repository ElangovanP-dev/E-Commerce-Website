import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProductManager } from '@/components/admin/ProductManager'
import { prisma } from '@/lib/db'
import { Product } from '@/types'

export default async function AdminProductsPage() {
  let products: Product[] = []
  try {
    const dbProducts = await prisma.product.findMany({
      include: { category: true, variants: true },
    })
    products = dbProducts.map((p) => ({
      ...p,
      images: JSON.parse(p.images as string),
    })) as Product[]
  } catch (e) {
    console.warn('Prisma DB query fallback:', e)
  }

  return (
    <AdminLayout>
      <ProductManager initialProducts={products} />
    </AdminLayout>
  )
}
