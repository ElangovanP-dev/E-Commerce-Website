'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Package, MapPin, Heart, Shield, RefreshCw, ChevronRight, Crown } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'security'>('overview')

  const sampleOrders = [
    {
      id: 'ord-1',
      orderNumber: 'AURA-849201',
      date: '2026-08-15',
      status: 'SHIPPED',
      total: 303.99,
      itemsCount: 1,
      tracking: 'TRK-DHL-992019',
    },
    {
      id: 'ord-2',
      orderNumber: 'AURA-619203',
      date: '2026-07-28',
      status: 'DELIVERED',
      total: 490.00,
      itemsCount: 1,
      tracking: 'TRK-FEDEX-100293',
    },
  ]

  return (
    <main className="min-h-screen bg-background py-10 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary shrink-0 shadow-glow">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="Elena Rostova"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-foreground">Elena Rostova</h1>
                <span className="bg-primary/20 text-primary font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-primary/30 flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>VIP Member</span>
                </span>
              </div>
              <p className="text-xs text-muted-fg font-mono">customer@luxurystore.com</p>
            </div>
          </div>

          <Link
            href="/admin"
            className="py-2.5 px-4 rounded-xl bg-primary text-primary-fg font-bold text-xs shadow-glow hover:opacity-90 transition-all"
          >
            Access Admin Command Center (/admin)
          </Link>
        </div>

        {/* Account Nav Tabs */}
        <div className="flex space-x-3 border-b border-border pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 ${
              activeTab === 'overview' ? 'bg-primary text-primary-fg shadow-glow' : 'text-muted-fg hover:bg-muted'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 ${
              activeTab === 'orders' ? 'bg-primary text-primary-fg shadow-glow' : 'text-muted-fg hover:bg-muted'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center space-x-2 ${
              activeTab === 'addresses' ? 'bg-primary text-primary-fg shadow-glow' : 'text-muted-fg hover:bg-muted'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Address Book</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-card border border-border space-y-2">
              <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">Total Purchases</span>
              <div className="text-2xl font-black font-mono text-primary">{formatCurrency(793.99)}</div>
              <p className="text-[11px] text-muted-fg">2 Completed Orders</p>
            </div>
            <div className="p-6 rounded-3xl bg-card border border-border space-y-2">
              <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">Default Shipping Address</span>
              <div className="text-xs font-bold text-foreground">742 Evergreen Terrace</div>
              <p className="text-[11px] text-muted-fg">Springfield, IL 62704</p>
            </div>
            <div className="p-6 rounded-3xl bg-card border border-border space-y-2">
              <span className="text-xs font-bold text-muted-fg uppercase tracking-wider">Wishlist Items</span>
              <div className="text-2xl font-black font-mono text-accent">3 Saved</div>
              <Link href="/account/wishlist" className="text-xs text-primary font-bold hover:underline block pt-1">
                View Wishlist Hub →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {sampleOrders.map((ord) => (
              <div key={ord.id} className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="font-mono font-bold text-primary text-sm">{ord.orderNumber}</span>
                    <span className="text-xs text-muted-fg ml-3 font-mono">{ord.date}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                    {ord.status}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-muted-fg">Total Paid: </span>
                    <span className="font-mono font-bold text-foreground">{formatCurrency(ord.total)}</span>
                  </div>
                  <div className="font-mono text-muted-fg">Tracking: {ord.tracking}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="p-6 rounded-3xl bg-card border border-border space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Default Delivery Address</h3>
            <div className="text-xs text-muted-fg space-y-1 font-mono">
              <p className="font-bold text-foreground">Elena Rostova</p>
              <p>742 Evergreen Terrace</p>
              <p>Springfield, IL 62704</p>
              <p>United States</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
