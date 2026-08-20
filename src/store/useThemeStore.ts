import { create } from 'zustand'
import Cookies from 'js-cookie'
import { ThemeId, ThemeConfig } from '@/types'

export const THEMES: ThemeConfig[] = [
  {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian',
    subtitle: 'Default Luxury Dark (Gold & Charcoal)',
    bgHex: '#090A0F',
    accentHex: '#D4AF37',
    primaryHex: '#D4AF37',
    isDark: true,
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    subtitle: 'Clean Modern (Ice Slate & Electric Blue)',
    bgHex: '#F8FAFC',
    accentHex: '#38BDF8',
    primaryHex: '#0284C7',
    isDark: false,
  },
  {
    id: 'emerald-botanical',
    name: 'Emerald Botanical',
    subtitle: 'Organic Elegance (Forest Green & Gold)',
    bgHex: '#062319',
    accentHex: '#F59E0B',
    primaryHex: '#10B981',
    isDark: true,
  },
  {
    id: 'sunset-terracotta',
    name: 'Sunset Terracotta',
    subtitle: 'Warm Artisanal (Clay Espresso & Coral)',
    bgHex: '#FFFBEB',
    accentHex: '#EA580C',
    primaryHex: '#EA580C',
    isDark: false,
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    subtitle: 'Futuristic Pulse (Magenta & Hyper Cyan)',
    bgHex: '#0B071A',
    accentHex: '#06B6D4',
    primaryHex: '#EC4899',
    isDark: true,
  },
  {
    id: 'sandstone-japandi',
    name: 'Sandstone Japandi',
    subtitle: 'Minimal Warmth (Travertine & Clay)',
    bgHex: '#F5F2EB',
    accentHex: '#B45309',
    primaryHex: '#44403C',
    isDark: false,
  },
  {
    id: 'deep-ocean-abyss',
    name: 'Deep Ocean Abyss',
    subtitle: 'Marine Tech (Navy & Seafoam Teal)',
    bgHex: '#021B35',
    accentHex: '#3B82F6',
    primaryHex: '#14B8A6',
    isDark: true,
  },
  {
    id: 'classic-editorial',
    name: 'Classic Editorial Monolith',
    subtitle: 'High-Contrast Print (Black, White & Crimson)',
    bgHex: '#FFFFFF',
    accentHex: '#E11D48',
    primaryHex: '#E11D48',
    isDark: false,
  },
]

interface ThemeState {
  currentTheme: ThemeId
  setTheme: (themeId: ThemeId) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: 'midnight-obsidian',
  setTheme: (themeId: ThemeId) => {
    Cookies.set('theme', themeId, { expires: 365 })
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', themeId)
      document.documentElement.setAttribute('data-theme', themeId)
    }
    set({ currentTheme: themeId })
  },
}))
