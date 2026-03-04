interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { n: 1, label: 'Отправитель', short: 'Шаг 1' },
  { n: 2, label: 'Получатель', short: 'Шаг 2' },
  { n: 3, label: 'Подтверждение', short: 'Шаг 3' },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = step.n < currentStep
        const active = step.n === currentStep
        return (
          <div key={step.n} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors
                  ${done ? 'bg-blue-600 text-white' : active ? 'bg-blue-600 text-white ring-4 ring-blue-600/20' : 'bg-surface text-text/40 border border-border'}`}
              >
                {done ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.n
                )}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${active ? 'text-blue-600' : done ? 'text-text/70' : 'text-text/40'}`}>
                {step.label}
              </span>
              <span className={`text-xs font-medium sm:hidden ${active ? 'text-blue-600' : done ? 'text-text/70' : 'text-text/40'}`}>
                {step.short}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-colors ${done ? 'bg-blue-600' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
