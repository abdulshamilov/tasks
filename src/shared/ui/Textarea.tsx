import { useId, type ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import { fieldClass, labelClass } from './fieldStyles'

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string
}

export const Textarea = ({ label, className, id, rows = 4, ...props }: TextareaProps) => {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className={labelClass}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        className={cn(fieldClass, 'resize-none', className)}
        {...props}
      />
    </div>
  )
}
