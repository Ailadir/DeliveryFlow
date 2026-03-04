'use client'

import { useEffect, useState } from 'react'
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage'

export type Theme = 'light' | 'dark' | 'system'

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    const stored = getItem<Theme>(STORAGE_KEYS.THEME)
    const initial = stored ?? 'system'
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  function applyTheme(t: Theme) {
    const resolved = resolveTheme(t)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }

  function setTheme(t: Theme) {
    setThemeState(t)
    setItem(STORAGE_KEYS.THEME, t)
    applyTheme(t)
  }

  function toggle() {
    const next = resolveTheme(theme) === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  return { theme, setTheme, toggle }
}
