'use client'

import { useEffect, useState } from 'react'
import type { FormDraft, SenderInfo, ReceiverInfo } from '@/lib/types'
import { getItem, setItem, removeItem, STORAGE_KEYS } from '@/lib/storage'

const DEFAULT_DRAFT: FormDraft = {
  step: 1,
  sender: {},
  receiver: {},
}

export function useFormStore() {
  const [draft, setDraftState] = useState<FormDraft>(DEFAULT_DRAFT)

  useEffect(() => {
    const stored = getItem<FormDraft>(STORAGE_KEYS.FORM_DRAFT)
    if (stored) setDraftState(stored)
  }, [])

  function updateDraft(updates: Partial<FormDraft>) {
    setDraftState((prev) => {
      const next = { ...prev, ...updates }
      setItem(STORAGE_KEYS.FORM_DRAFT, next)
      return next
    })
  }

  function setSender(sender: Partial<SenderInfo>) {
    updateDraft({ sender })
  }

  function setReceiver(receiver: Partial<ReceiverInfo>) {
    updateDraft({ receiver })
  }

  function setStep(step: 1 | 2 | 3) {
    updateDraft({ step })
  }

  function clearDraft() {
    removeItem(STORAGE_KEYS.FORM_DRAFT)
    setDraftState(DEFAULT_DRAFT)
  }

  return { draft, setSender, setReceiver, setStep, clearDraft }
}
