'use client'

import type { CargoType } from '@/lib/types'
import { CARGO_TYPE_LABELS } from '@/lib/utils'

interface OrderFiltersProps {
  active: CargoType[]
  onChange: (types: CargoType[]) => void
}

const ALL_TYPES: CargoType[] = ['documents', 'fragile', 'regular']

export function OrderFilters({ active, onChange }: OrderFiltersProps) {
  function toggle(type: CargoType) {
    if (active.includes(type)) {
      onChange(active.filter((t) => t !== type))
    } else {
      onChange([...active, type])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ALL_TYPES.map((type) => {
        const on = active.includes(type)
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors
              ${on
                ? 'bg-blue-600 text-white'
                : 'bg-surface text-text/70 border border-border hover:border-blue-400 hover:text-text'
              }`}
          >
            {CARGO_TYPE_LABELS[type]}
          </button>
        )
      })}
    </div>
  )
}
