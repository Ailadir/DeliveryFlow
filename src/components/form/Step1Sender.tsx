'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { step1Schema, type Step1Data } from '@/lib/validation'
import type { SenderInfo } from '@/lib/types'

interface Step1SenderProps {
  initial: Partial<SenderInfo>
  onNext: (data: SenderInfo) => void
}

export function Step1Sender({ initial, onNext }: Step1SenderProps) {
  const [values, setValues] = useState<Partial<Step1Data>>({
    name: initial.name ?? '',
    phone: initial.phone ?? '',
    city: initial.city ?? '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({})

  function handleChange(field: keyof Step1Data, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = step1Schema.safeParse(values)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Step1Data, string>> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Step1Data
        fieldErrors[key] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    onNext(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-text mb-1">Данные отправителя</h2>
        <p className="text-sm text-text/60">Укажите ваши контактные данные</p>
      </div>
      <Input
        label="Имя"
        placeholder="Иван Иванов"
        value={values.name ?? ''}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />
      <Input
        label="Телефон"
        placeholder="+7 (999) 123-45-67"
        value={values.phone ?? ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
      />
      <Input
        label="Город отправления"
        placeholder="Москва"
        value={values.city ?? ''}
        onChange={(e) => handleChange('city', e.target.value)}
        error={errors.city}
      />
      <div className="flex justify-end pt-2">
        <Button type="submit">Далее →</Button>
      </div>
    </form>
  )
}
