'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Download, Package, Truck, Home, Sparkles, Mail, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get('orderNumber') || 'AURA-849201'

  const handleDownloadInvoice = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-background py-12 sm:py-20 text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 rounded-3xl bg-card border border-border text-center space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">
              Payment Confirmed & Verified
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-muted-fg font-mono">
              Order Reference Number: <span className="font-bold text-primary">{orderNumber}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 shrink-0" />
            <span>Order confirmation and PDF receipt have been dispatched via Resend to your email.</span>
          </div>

          {/* Visual Order Progress Tracker */}
          <div className="pt-6 border-t border-border space-y-4 text-left">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-muted-fg text-center">
              Real-Time Visual Order Tracker
            </h4>

            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              {/* Placed */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-emerald-400">Order Placed</span>
              </div>

              {/* Packed */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <span className="text-emerald-400">Packed</span>
              </div>

              {/* Shipped */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-fg mx-auto flex items-center justify-center font-bold animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-primary">In Transit</span>
              </div>

              {/* Delivered */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-muted border border-border text-muted-fg mx-auto flex items-center justify-center font-bold">
                  4
                </div>
                <span className="text-muted-fg">Delivered</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownloadInvoice}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-card border border-border hover:bg-muted text-foreground font-bold text-xs flex items-center justify-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Download PDF Invoice</span>
            </button>

            <Link
              href="/#products"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-primary text-primary-fg font-extrabold text-xs flex items-center justify-center space-x-2 shadow-glow hover:opacity-95 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
