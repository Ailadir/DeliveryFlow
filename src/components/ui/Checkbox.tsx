import { InputHTMLAttributes, forwardRef } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="flex items-start gap-2 cursor-pointer">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={`mt-0.5 h-4 w-4 rounded border-border accent-blue-600 ${className}`}
            {...props}
          />
          <span className="text-sm text-text">{label}</span>
        </label>
        {error && <p className="text-xs text-red-500 ml-6">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
export { Checkbox }
