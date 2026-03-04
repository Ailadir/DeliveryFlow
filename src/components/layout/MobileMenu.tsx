'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from './ThemeSwitcher'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  return (
    <div ref={ref} className="relative sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Открыть меню"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text/70 hover:text-text hover:bg-surface transition-colors"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-border bg-bg shadow-lg overflow-hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-surface transition-colors"
          >
            Новая заявка
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-text/70 hover:text-text hover:bg-surface transition-colors"
          >
            История
          </Link>
          <div className="border-t border-border flex items-center justify-between px-4 py-2.5">
            <span className="text-sm font-medium text-text/70">Тема</span>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </div>
  )
}
