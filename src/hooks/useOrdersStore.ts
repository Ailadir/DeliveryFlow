'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@/lib/types'
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage'

export function useOrdersStore() {
  const [orders, setOrdersState] = useState<Order[]>([])

  useEffect(() => {
    const stored = getItem<Order[]>(STORAGE_KEYS.ORDERS)
    if (stored) setOrdersState(stored)
  }, [])

  function save(list: Order[]) {
    setOrdersState(list)
    setItem(STORAGE_KEYS.ORDERS, list)
  }

  function addOrder(order: Order) {
    save([order, ...orders])
  }

  function deleteOrder(id: string) {
    save(orders.filter((o) => o.id !== id))
  }

  function getOrder(id: string): Order | undefined {
    return orders.find((o) => o.id === id)
  }

  return { orders, addOrder, deleteOrder, getOrder }
}
