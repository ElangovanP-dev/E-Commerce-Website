'use client'

import { useState } from 'react'
import { X, Ruler, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/useUIStore'

export function SizeGuideModal() {
  const { isSizeGuideOpen, toggleSizeGuide } = useUIStore()
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')

  if (!isSizeGuideOpen) return null

  const sizeChart = [
    { size: 'S', chestImp: '36 - 38 in', chestMet: '91 - 96 cm', lengthImp: '27 in', lengthMet: '68 cm' },
    { size: 'M', chestImp: '38 - 40 in', chestMet: '96 - 101 cm', lengthImp: '28 in', lengthMet: '71 cm' },
    { size: 'L', chestImp: '41 - 43 in', chestMet: '104 - 109 cm', lengthImp: '29 in', lengthMet: '74 cm' },
    { size: 'XL', chestImp: '44 - 46 in', chestMet: '111 - 117 cm', lengthImp: '30 in', lengthMet: '76 cm' },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSizeGuide}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-foreground space-y-6"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-primary" />
              <h3 className="font-extrabold text-base uppercase tracking-wider">Interactive Size Guide</h3>
            </div>
            <button
              onClick={toggleSizeGuide}
              className="p-1.5 rounded-full hover:bg-muted text-muted-fg hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle Switch */}
          <div className="flex justify-between items-center bg-muted p-1.5 rounded-2xl border border-border">
            <span className="text-xs font-semibold px-3 text-muted-fg">Measurement System</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unit === 'imperial' ? 'bg-primary text-primary-fg shadow-sm' : 'text-muted-fg hover:text-foreground'
                }`}
              >
                Imperial (Inches)
              </button>
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unit === 'metric' ? 'bg-primary text-primary-fg shadow-sm' : 'text-muted-fg hover:text-foreground'
                }`}
              >
                Metric (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-fg uppercase tracking-wider font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Size</th>
                  <th className="p-3.5">Chest Width</th>
                  <th className="p-3.5">Garment Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-muted/40 font-mono">
                    <td className="p-3.5 font-bold text-primary">{row.size}</td>
                    <td className="p-3.5">{unit === 'imperial' ? row.chestImp : row.chestMet}</td>
                    <td className="p-3.5">{unit === 'imperial' ? row.lengthImp : row.lengthMet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-muted-fg leading-relaxed">
            * Measurement tips: For an oversized relaxed fit, select one size larger than your standard measurement.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
