'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { CARGO_TYPE_LABELS, formatPhone } from '@/lib/utils'
import type { SenderInfo, ReceiverInfo } from '@/lib/types'

interface Step3ConfirmationProps {
  sender: SenderInfo
  receiver: ReceiverInfo
  onSubmit: () => void
  onBack: () => void
}

export function Step3Confirmation({ sender, receiver, onSubmit, onBack }: Step3ConfirmationProps) {
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | undefined>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) {
      setError('Необходимо согласиться с условиями')
      return
    }
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-text mb-1">Подтверждение заявки</h2>
        <p className="text-sm text-text/60">Проверьте данные перед отправкой</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-text/50">Отправитель</p>
          <p className="font-medium text-text">{sender.name}</p>
          <p className="text-sm text-text/70">{formatPhone(sender.phone)}</p>
          <p className="text-sm text-text/70">{sender.city}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-text/50">Получатель</p>
          <p className="font-medium text-text">{receiver.name}</p>
          <p className="text-sm text-text/70">{receiver.city}</p>
          <p className="text-sm text-text/70">
            {CARGO_TYPE_LABELS[receiver.cargoType]} · {receiver.weight} кг
          </p>
        </div>
      </div>

      <Checkbox
        label="Я согласен с условиями доставки и обработкой персональных данных"
        checked={agreed}
        onChange={(e) => {
          setAgreed(e.target.checked)
          if (e.target.checked) setError(undefined)
        }}
        error={error}
      />

      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          <span className="sm:hidden">←</span><span className="hidden sm:inline">← Назад</span>
        </Button>
        <Button type="submit">Отправить заявку</Button>
      </div>
    </form>
  )
}
