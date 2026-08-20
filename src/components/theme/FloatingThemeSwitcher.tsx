'use client'

import { useState } from 'react'
import { Palette, Check, X, Sparkles } from 'lucide-react'
import { THEMES, useThemeStore } from '@/store/useThemeStore'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, setTheme } = useThemeStore()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 p-4 rounded-2xl bg-card border border-border shadow-2xl glass-panel text-foreground"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="font-semibold text-sm uppercase tracking-wider">8-Theme Visual System</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-muted transition-colors text-muted-fg hover:text-fg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {THEMES.map((t) => {
                const isActive = currentTheme === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id)
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                      isActive
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border/60 hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Color Palette Preview Swatches */}
                      <div className="flex -space-x-1">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm inline-block"
                          style={{ backgroundColor: t.bgHex }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm inline-block"
                          style={{ backgroundColor: t.primaryHex }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm inline-block"
                          style={{ backgroundColor: t.accentHex }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-xs text-foreground flex items-center gap-1.5">
                          {t.name}
                        </div>
                        <div className="text-[10px] text-muted-fg line-clamp-1">{t.subtitle}</div>
                      </div>
                    </div>

                    {isActive && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-primary text-primary-fg font-semibold text-xs py-3 px-4 rounded-full shadow-glow border border-primary/20 hover:opacity-95 transition-all"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Theme Engine</span>
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
      </motion.button>
    </div>
  )
}
