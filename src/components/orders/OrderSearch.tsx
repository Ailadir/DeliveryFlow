'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'

interface OrderSearchProps {
  value: string
  onChange: (value: string) => void
}

export function OrderSearch({ value, onChange }: OrderSearchProps) {
  const [local, setLocal] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => onChange(local), 300)
    return () => clearTimeout(timer)
  }, [local, onChange])

  return (
    <Input
      placeholder="Поиск по получателю или городу..."
      value={local}
      onChange={(e) => setLocal(e.target.value)}
    />
  )
}
