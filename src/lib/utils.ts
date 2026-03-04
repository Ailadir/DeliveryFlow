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
