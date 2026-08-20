'use client'

import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

const REVENUE_DATA = [
  { month: 'Jan', revenue: 14200, orders: 120 },
  { month: 'Feb', revenue: 18500, orders: 154 },
  { month: 'Mar', revenue: 22400, orders: 190 },
  { month: 'Apr', revenue: 19800, orders: 165 },
  { month: 'May', revenue: 28900, orders: 230 },
  { month: 'Jun', revenue: 34500, orders: 290 },
  { month: 'Jul', revenue: 42100, orders: 340 },
]

const LOW_STOCK_ITEMS = [
  { title: 'Kyoto Travertine Stone Lamp', sku: 'HOME-LMP-001', stock: 4, category: 'Japandi Living' },
  { title: 'Orbital Tourbillon Prototype', sku: 'TIME-LUX-005', stock: 3, category: 'Timepieces' },
  { title: 'Cyberpunk Waterproof Parka', sku: 'APP-JKT-005', stock: 7, category: 'Apparel' },
]

const RECENT_SALES = [
  { id: '1', name: 'Alexander Wright', email: 'a.wright@corp.com', amount: 990.0, status: 'PAID', date: '10 mins ago' },
  { id: '2', name: 'Sophia Chen', email: 'sophia@tech.io', amount: 349.99, status: 'PAID', date: '25 mins ago' },
  { id: '3', name: 'David Miller', email: 'dmiller@design.com', amount: 1250.0, status: 'PROCESSING', date: '1 hour ago' },
  { id: '4', name: 'Emma Watson', email: 'emma@fashion.co', amount: 490.0, status: 'SHIPPED', date: '3 hours ago' },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
            Executive Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Analytics Overview
          </h1>
        </div>
        <div className="bg-primary/10 border border-primary/20 text-primary font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Real-time Live Sync</span>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-card border border-border space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-fg">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">{formatCurrency(180400)}</div>
          <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-fg">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value (AOV)</span>
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">{formatCurrency(284.50)}</div>
          <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+5.2% vs last month</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-fg">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">3.42%</div>
          <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8% benchmark high</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-muted-fg">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-black font-mono text-foreground">1,489</div>
          <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+142 this week</span>
          </div>
        </div>
      </div>

      {/* Interactive Recharts Area & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
          <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
            Revenue & Order Growth Trajectory
          </h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--color-muted-fg)" fontSize={12} />
                <YAxis stroke="var(--color-muted-fg)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '12px',
                    color: 'var(--color-fg)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
                Low Stock Alerts
              </h3>
            </div>
            <p className="text-xs text-muted-fg">Items requiring immediate re-order replenishments.</p>

            <div className="space-y-3">
              {LOW_STOCK_ITEMS.map((item) => (
                <div key={item.sku} className="p-3.5 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-foreground line-clamp-1">{item.title}</h4>
                    <span className="font-mono text-[10px] text-muted-fg">SKU: {item.sku}</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-3 rounded-2xl bg-primary text-primary-fg font-bold text-xs shadow-glow">
            Generate Purchase Order
          </button>
        </div>
      </div>

      {/* Live Recent Sales Feed */}
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
          Recent Real-Time Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-fg uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment Status</th>
                <th className="p-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_SALES.map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/40 font-medium">
                  <td className="p-3.5">
                    <div className="font-bold text-foreground">{sale.name}</div>
                    <div className="text-[11px] text-muted-fg">{sale.email}</div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-primary">{formatCurrency(sale.amount)}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-muted-fg font-mono">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
