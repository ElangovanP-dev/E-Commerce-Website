import { AdminLayout } from '@/components/admin/AdminLayout'
import { OrderManager } from '@/components/admin/OrderManager'

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <OrderManager />
    </AdminLayout>
  )
}
