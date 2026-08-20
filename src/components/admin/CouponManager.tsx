'use client'

import { useState } from 'react'
import { Tag, Plus, Trash2, Check, Sparkles } from 'lucide-react'

export function CouponManager() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'WELCOME20', type: 'PERCENTAGE', value: 20, minSpend: 50, maxUses: 500, used: 12, active: true },
    { id: '2', code: 'SAVE50', type: 'FIXED', value: 50, minSpend: 200, maxUses: 100, used: 5, active: true },
    { id: '3', code: 'VIPSUMMER', type: 'PERCENTAGE', value: 30, minSpend: 150, maxUses: 50, used: 2, active: true },
  ])

  const [code, setCode] = useState('')
  const [value, setValue] = useState('')
  const [type, setType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE')
  const [minSpend, setMinSpend] = useState('50')

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code || !value) return

    setCoupons([
      {
        id: String(Date.now()),
        code: code.trim().toUpperCase(),
        type,
        value: Number(value),
        minSpend: Number(minSpend),
        maxUses: 100,
        used: 0,
        active: true,
      },
      ...coupons,
    ])

    setCode('')
    setValue('')
  }

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
          Promotions & Campaigns
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Discount Coupons
        </h1>
      </div>

      {/* Create Coupon Form */}
      <form onSubmit={handleAddCoupon} className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-foreground">
          Create Promo Code
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-muted-fg block mb-1">Coupon Code</label>
            <input
              type="text"
              placeholder="e.g. SUMMER2026"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full bg-input border border-border text-foreground font-mono rounded-xl p-3 focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="font-bold text-muted-fg block mb-1">Discount Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
            >
              <option value="PERCENTAGE">PERCENTAGE (%)</option>
              <option value="FIXED">FIXED AMOUNT ($)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-muted-fg block mb-1">Discount Value</label>
            <input
              type="number"
              placeholder="20"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="font-bold text-muted-fg block mb-1">Min Spend ($)</label>
            <input
              type="number"
              value={minSpend}
              onChange={(e) => setMinSpend(e.target.value)}
              className="w-full bg-input border border-border text-foreground rounded-xl p-3 focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-3 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-xs shadow-glow"
        >
          Publish Promo Code
        </button>
      </form>

      {/* Coupons Table */}
      <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-fg uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Min Spend</th>
                <th className="p-4">Redemptions</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 font-medium">
                  <td className="p-4 font-mono font-bold text-primary">{c.code}</td>
                  <td className="p-4 font-mono font-bold">
                    {c.value}{c.type === 'PERCENTAGE' ? '%' : '$'} OFF
                  </td>
                  <td className="p-4 font-mono">${c.minSpend}</td>
                  <td className="p-4 font-mono">{c.used} / {c.maxUses}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-xl hover:bg-red-500/10 text-muted-fg hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
