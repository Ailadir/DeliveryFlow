import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity"
        >
          HappyPhone
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-text/70 hover:text-text hover:bg-surface transition-colors"
          >
            Новая заявка
          </Link>
          <Link
            href="/orders"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-text/70 hover:text-text hover:bg-surface transition-colors"
          >
            История
          </Link>
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeSwitcher />
          </div>
        </nav>

        <div className="flex sm:hidden items-center">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
