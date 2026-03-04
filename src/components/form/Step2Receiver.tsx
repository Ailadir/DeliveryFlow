'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { step2Schema, type Step2Data } from '@/lib/validation'
import { CARGO_TYPE_LABELS } from '@/lib/utils'
import type { ReceiverInfo, CargoType } from '@/lib/types'

interface Step2ReceiverProps {
  initial: Partial<ReceiverInfo>
  senderCity: string
  onNext: (data: ReceiverInfo) => void
  onBack: () => void
}

const cargoOptions = Object.entries(CARGO_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

type FormValues = {
  receiverName: string
  receiverCity: string
  cargoType: string
  weight: string
}

export function Step2Receiver({ initial, senderCity, onNext, onBack }: Step2ReceiverProps) {
  const [values, setValues] = useState<FormValues>({
    receiverName: initial.name ?? '',
    receiverCity: initial.city ?? '',
    cargoType: initial.cargoType ?? '',
    weight: initial.weight ? String(initial.weight) : '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Step2Data, string>>>({})

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = {
      receiverName: values.receiverName,
      receiverCity: values.receiverCity,
      senderCity,
      cargoType: values.cargoType,
      weight: parseFloat(values.weight),
    }
    const result = step2Schema.safeParse(parsed)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Step2Data, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Step2Data
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    onNext({
      name: result.data.receiverName,
      city: result.data.receiverCity,
      cargoType: result.data.cargoType as CargoType,
      weight: result.data.weight,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-text mb-1">Данные получателя</h2>
        <p className="text-sm text-text/60">Укажите, кому и куда отправляем</p>
      </div>
      <Input
        label="Имя получателя"
        placeholder="Мария Петрова"
        value={values.receiverName}
        onChange={(e) => handleChange('receiverName', e.target.value)}
        error={errors.receiverName}
      />
      <Input
        label="Город доставки"
        placeholder="Санкт-Петербург"
        value={values.receiverCity}
        onChange={(e) => handleChange('receiverCity', e.target.value)}
        error={errors.receiverCity}
      />
      <Select
        label="Тип груза"
        placeholder="Выберите тип..."
        options={cargoOptions}
        value={values.cargoType}
        onChange={(e) => handleChange('cargoType', e.target.value)}
        error={errors.cargoType}
      />
      <Input
        label="Вес (кг)"
        type="number"
        placeholder="1.5"
        min="0.1"
        max="30"
        step="0.1"
        value={values.weight}
        onChange={(e) => handleChange('weight', e.target.value)}
        error={errors.weight}
      />
      <div className="flex justify-between pt-2">
        <Button type="button" variant="secondary" onClick={onBack}>
          ← Назад
        </Button>
        <Button type="submit">Далее →</Button>
      </div>
    </form>
  )
}
