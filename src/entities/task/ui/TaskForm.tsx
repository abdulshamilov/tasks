import { useState } from 'react'
import { Button, Input, Select, Textarea } from '@/shared/ui'
import { PRIORITIES, STATUSES } from '../model/constants'
import type { TaskFormValues, TaskPriority, TaskStatus } from '../model/types'

const DEFAULTS: TaskFormValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
}

interface TaskFormProps {
  initialValues?: Partial<TaskFormValues>
  submitLabel: string
  isPending?: boolean
  error?: string | null
  onSubmit: (values: TaskFormValues) => void
  onCancel: () => void
}

export const TaskForm = ({
  initialValues,
  submitLabel,
  isPending,
  error,
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const [values, setValues] = useState<TaskFormValues>({ ...DEFAULTS, ...initialValues })
  const [titleError, setTitleError] = useState('')

  const set = <K extends keyof TaskFormValues>(key: K, value: TaskFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const submit = () => {
    const title = values.title.trim()
    if (!title) {
      setTitleError('Введите название задачи')
      return
    }
    onSubmit({ ...values, title, description: values.description.trim() })
  }

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <Input
        label="Название *"
        placeholder="Что нужно сделать?"
        maxLength={100}
        autoFocus
        value={values.title}
        error={titleError}
        onChange={(e) => {
          set('title', e.target.value)
          if (titleError) setTitleError('')
        }}
      />
      <Textarea
        label="Описание"
        placeholder="Подробности (необязательно)"
        value={values.description}
        onChange={(e) => set('description', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Статус"
          options={STATUSES}
          value={values.status}
          onChange={(e) => set('status', e.target.value as TaskStatus)}
        />
        <Select
          label="Приоритет"
          options={PRIORITIES}
          value={values.priority}
          onChange={(e) => set('priority', e.target.value as TaskPriority)}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Сохранение…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
