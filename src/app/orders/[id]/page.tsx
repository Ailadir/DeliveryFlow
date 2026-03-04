'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useOrdersStore } from '@/hooks/useOrdersStore'
import { Button } from '@/components/ui/Button'
import { CARGO_TYPE_LABELS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, formatDate, formatPhone } from '@/lib/utils'
import type { Order } from '@/lib/types'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { orders } = useOrdersStore()
  const [order, setOrder] = useState<Order | null | undefined>(undefined)

  useEffect(() => {
    if (orders.length === 0) return
    const found = orders.find((o) => o.id === id)
    setOrder(found ?? null)
  }, [orders, id])

  if (order === undefined) return null

  if (order === null) {
    return (
      <div className="mx-auto max-w-2xl text-center py-16">
        <p className="text-text/50 mb-4">Заявка не найдена</p>
        <Link href="/orders">
          <Button variant="secondary">← К списку заявок</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text/50 font-mono mb-1">#{order.id.slice(0, 8)}</p>
          <h1 className="text-2xl font-bold text-text">
            {order.sender.city} → {order.receiver.city}
          </h1>
          <p className="text-sm text-text/60 mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        <Button variant="secondary" onClick={() => router.back()}>
          <span className="sm:hidden">←</span><span className="hidden sm:inline">← Назад</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-bg p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-text">Статус заявки</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg p-5 flex flex-col gap-3">
          <h2 className="font-semibold text-text border-b border-border pb-2">Отправитель</h2>
          <div className="flex flex-col gap-2">
            <Field label="Имя" value={order.sender.name} />
            <Field label="Телефон" value={formatPhone(order.sender.phone)} />
            <Field label="Город" value={order.sender.city} />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-bg p-5 flex flex-col gap-3">
          <h2 className="font-semibold text-text border-b border-border pb-2">Получатель</h2>
          <div className="flex flex-col gap-2">
            <Field label="Имя" value={order.receiver.name} />
            <Field label="Город" value={order.receiver.city} />
            <Field label="Тип груза" value={CARGO_TYPE_LABELS[order.receiver.cargoType]} />
            <Field label="Вес" value={`${order.receiver.weight} кг`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text/50">{label}</p>
      <p className="text-sm text-text font-medium">{value}</p>
    </div>
  )
}
