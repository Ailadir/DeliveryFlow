'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useOrdersStore } from '@/hooks/useOrdersStore'
import { OrderCard } from '@/components/orders/OrderCard'
import { OrderSearch } from '@/components/orders/OrderSearch'
import { OrderFilters } from '@/components/orders/OrderFilters'
import { DeleteDialog } from '@/components/orders/DeleteDialog'
import { Button } from '@/components/ui/Button'
import type { CargoType } from '@/lib/types'

export default function OrdersPage() {
  const { orders, deleteOrder } = useOrdersStore()
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState<CargoType[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = orders
    if (activeFilters.length > 0) {
      result = result.filter((o) => activeFilters.includes(o.receiver.cargoType))
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (o) =>
          o.receiver.name.toLowerCase().includes(q) ||
          o.receiver.city.toLowerCase().includes(q)
      )
    }
    return result
  }, [orders, search, activeFilters])

  const handleDelete = useCallback((id: string) => {
    setDeletingId(id)
  }, [])

  function confirmDelete() {
    if (deletingId) {
      deleteOrder(deletingId)
      setDeletingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">История заявок</h1>
          <p className="text-sm text-text/60 mt-0.5">{orders.length} заявок всего</p>
        </div>
        <Link href="/">
          <Button>
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">+ Новая заявка</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <OrderSearch value={search} onChange={setSearch} />
        <OrderFilters active={activeFilters} onChange={setActiveFilters} />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border border-dashed p-12 text-center">
          <p className="text-text/50">
            {orders.length === 0
              ? 'Заявок пока нет. Оформите первую!'
              : 'Ничего не найдено'}
          </p>
          {orders.length === 0 && (
            <Link href="/" className="mt-4 inline-block">
              <Button>Оформить заявку</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <DeleteDialog
        open={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
