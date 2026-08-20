'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Users,
  ArrowLeft,
  Crown,
  Sparkles,
} from 'lucide-react'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Analytics Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventory Manager', href: '/admin/products', icon: Package },
    { name: 'Order Logistics', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Coupon Campaigns', href: '/admin/coupons', icon: Tag },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-6 flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-fg flex items-center justify-center font-bold shadow-glow">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-wider text-foreground">
                ADMIN<span className="text-primary">CMS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
                Executive Portal
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-primary text-primary-fg font-extrabold shadow-glow'
                      : 'text-muted-fg hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-bold text-muted-fg hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Stage */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
