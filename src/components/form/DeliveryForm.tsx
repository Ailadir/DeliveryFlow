'use client'

import { useRouter } from 'next/navigation'
import { useFormStore } from '@/hooks/useFormStore'
import { useOrdersStore } from '@/hooks/useOrdersStore'
import { StepIndicator } from './StepIndicator'
import { Step1Sender } from './Step1Sender'
import { Step2Receiver } from './Step2Receiver'
import { Step3Confirmation } from './Step3Confirmation'
import type { SenderInfo, ReceiverInfo, Order } from '@/lib/types'

export function DeliveryForm() {
  const router = useRouter()
  const { draft, setSender, setReceiver, setStep, clearDraft } = useFormStore()
  const { addOrder } = useOrdersStore()

  function handleStep1Next(data: SenderInfo) {
    setSender(data)
    setStep(2)
  }

  function handleStep2Next(data: ReceiverInfo) {
    setReceiver(data)
    setStep(3)
  }

  function handleStep2Back() {
    setStep(1)
  }

  function handleStep3Back() {
    setStep(2)
  }

  function handleSubmit() {
    const sender = draft.sender as SenderInfo
    const receiver = draft.receiver as ReceiverInfo

    const order: Order = {
      id: crypto.randomUUID(),
      sender,
      receiver,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }

    addOrder(order)
    clearDraft()
    router.push('/orders')
  }

  const step = draft.step

  return (
    <div className="mx-auto max-w-2xl">
      <StepIndicator currentStep={step} />
      <div className="rounded-2xl border border-border bg-bg p-6 shadow-sm">
        {step === 1 && (
          <Step1Sender initial={draft.sender} onNext={handleStep1Next} />
        )}
        {step === 2 && (
          <Step2Receiver
            initial={draft.receiver}
            senderCity={draft.sender.city ?? ''}
            onNext={handleStep2Next}
            onBack={handleStep2Back}
          />
        )}
        {step === 3 && draft.sender.name && draft.receiver.name && (
          <Step3Confirmation
            sender={draft.sender as SenderInfo}
            receiver={draft.receiver as ReceiverInfo}
            onSubmit={handleSubmit}
            onBack={handleStep3Back}
          />
        )}
      </div>
    </div>
  )
}
