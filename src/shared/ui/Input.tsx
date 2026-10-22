import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import { fieldClass, labelClass } from './fieldStyles'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, id, ...props }: InputProps) => {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(fieldClass, error && 'border-red-500', className)}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
