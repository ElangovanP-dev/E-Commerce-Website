'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import { ThemeId } from '@/types'
import Cookies from 'js-cookie'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { currentTheme, setTheme } = useThemeStore()

  useEffect(() => {
    setMounted(true)
    const savedTheme = (Cookies.get('theme') || localStorage.getItem('theme') || 'midnight-obsidian') as ThemeId
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [setTheme])

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return <>{children}</>
}
