import type { CargoType, OrderStatus } from './types'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Ожидает обработки',
  PROCESSING: 'В обработке',
  COLLECTING: 'Собирается',
  READY_TO_SHIP: 'Готов к отправке',
  IN_TRANSIT: 'В пути',
  DELIVERED: 'Доставлена',
  CANCELLED: 'Отменена',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  PROCESSING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  COLLECTING: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY_TO_SHIP: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  IN_TRANSIT: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

export const CARGO_TYPE_LABELS: Record<CargoType, string> = {
  documents: 'Документы',
  fragile: 'Хрупкое',
  regular: 'Обычный груз',
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length !== 11) return phone
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}
