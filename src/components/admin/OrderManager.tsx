'use client'

import { useState } from 'react'
import { ShoppingBag, Truck, Check, Search, Eye, Sparkles } from 'lucide-react'
import { Order } from '@/types'
import { formatCurrency } from '@/lib/utils'

const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    orderNumber: 'AURA-849201',
    user: { name: 'Elena Rostova', email: 'customer@luxurystore.com' },
    items: [],
    subtotal: 299.99,
    tax: 24.0,
    shippingFee: 0,
    discount: 20.0,
    total: 303.99,
    status: 'PROCESSING' as const,
    paymentStatus: 'PAID',
    shippingAddress: { fullName: 'Elena Rostova', street: '742 Evergreen Terr', city: 'Springfield', state: 'IL', postalCode: '62704', country: 'USA' },
    trackingNumber: 'TRK-DHL-992019',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ord-102',
    orderNumber: 'AURA-729104',
    user: { name: 'Marcus Vance', email: 'marcus@vance.com' },
    items: [],
    subtotal: 990.0,
    tax: 79.2,
    shippingFee: 0,
    discount: 0,
    total: 1069.2,
    status: 'SHIPPED' as const,
    paymentStatus: 'PAID',
    shippingAddress: { fullName: 'Marcus Vance', street: '100 Wall Street', city: 'New York', state: 'NY', postalCode: '10005', country: 'USA' },
    trackingNumber: 'TRK-FEDEX-883102',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export function OrderManager() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [activeFilter, setActiveFilter] = useState<string>('ALL')

  const handleUpdateStatus = (orderId: string, newStatus: any) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const filteredOrders = activeFilter === 'ALL'
    ? orders
    : orders.filter((o) => o.status === activeFilter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Fulfillment Logistics
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Orders ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-border pb-3 overflow-x-auto text-xs font-bold">
        {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeFilter === tab
                ? 'bg-primary text-primary-fg shadow-glow'
                : 'text-muted-fg hover:text-foreground hover:bg-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Data Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-fg uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Status Updater</th>
                <th className="p-4">Tracking Code</th>
                <th className="p-4 font-mono">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-muted/40 font-medium">
                  <td className="p-4 font-mono font-bold text-primary">{ord.orderNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-foreground">{ord.user?.name}</div>
                    <div className="text-[11px] text-muted-fg">{ord.user?.email}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-foreground">{formatCurrency(ord.total)}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className="bg-input border border-border text-foreground font-mono text-[11px] font-bold rounded-xl p-2 focus:ring-1 focus:ring-primary"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 font-mono text-xs">
                    {ord.trackingNumber ? (
                      <span className="text-emerald-400 font-bold">{ord.trackingNumber}</span>
                    ) : (
                      <span className="text-muted-fg italic">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-fg font-mono">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
