import { useState } from 'react'
import { QueryProvider } from './providers/QueryProvider'
import { Button, Input, Modal, Select, Textarea } from '@/shared/ui'
import { PRIORITIES } from '@/entities/task'

export const App = () => {
  const [open, setOpen] = useState(false)

  return (
    <QueryProvider>
      <div className="flex flex-wrap gap-2 p-6">
        <Button onClick={() => setOpen(true)}>Открыть модалку</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Тест">
        <div className="space-y-4">
          <Input label="Название" error="Введите название" />
          <Textarea label="Описание" />
          <Select label="Приоритет" options={PRIORITIES} />
        </div>
      </Modal>
    </QueryProvider>
  )
}
