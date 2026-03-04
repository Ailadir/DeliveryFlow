export const STORAGE_KEYS = {
  FORM_DRAFT: 'happyphone_form_draft',
  ORDERS: 'happyphone_orders',
  THEME: 'happyphone_theme',
} as const

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage quota exceeded or unavailable
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // unavailable
  }
}
