import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import { fieldClass, labelClass } from './fieldStyles'

interface Option {
  value: string
  label: string
}

interface SelectProps extends ComponentProps<'select'> {
  label?: string
  options: Option[]
}

export const Select = ({ label, options, className, id, ...props }: SelectProps) => {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className={labelClass}>
          {label}
        </label>
      )}
      <select id={fieldId} className={cn(fieldClass, className)} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
