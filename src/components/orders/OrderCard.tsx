import Link from 'next/link'
import type { Order } from '@/lib/types'
import { CARGO_TYPE_LABELS, ORDER_STATUS_LABELS, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface OrderCardProps {
  order: Order
  onDelete: (id: string) => void
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  PROCESSING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  COLLECTING: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  READY_TO_SHIP: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  IN_TRANSIT: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

export function OrderCard({ order, onDelete }: OrderCardProps) {
  return (
    <div className="rounded-xl border border-border bg-bg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-text/50 font-mono">#{order.id.slice(0, 8)}</p>
          <p className="font-semibold text-text text-sm">
            {order.sender.city} → {order.receiver.city}
          </p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[order.status]}`}>
          {ORDER_STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs text-text/50">Отправитель</p>
          <p className="text-text">{order.sender.name}</p>
        </div>
        <div>
          <p className="text-xs text-text/50">Получатель</p>
          <p className="text-text">{order.receiver.name}</p>
        </div>
        <div>
          <p className="text-xs text-text/50">Тип груза</p>
          <p className="text-text">{CARGO_TYPE_LABELS[order.receiver.cargoType]}</p>
        </div>
        <div>
          <p className="text-xs text-text/50">Вес</p>
          <p className="text-text">{order.receiver.weight} кг</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <p className="text-xs text-text/50">{formatDate(order.createdAt)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(order.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Удалить
          </Button>
          <Link href={`/orders/${order.id}`}>
            <Button variant="secondary" size="sm">Подробнее</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
