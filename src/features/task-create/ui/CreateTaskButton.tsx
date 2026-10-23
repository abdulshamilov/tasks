import { useState } from 'react'
import { TaskForm, useCreateTask } from '@/entities/task'
import { Button, Modal } from '@/shared/ui'

export const CreateTaskButton = () => {
  const [open, setOpen] = useState(false)
  const { mutate, isPending, error, reset } = useCreateTask()

  const close = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span aria-hidden>+</span>
        <span className="hidden sm:inline">Новая задача</span>
      </Button>

      <Modal open={open} onClose={close} title="Новая задача">
        <TaskForm
          submitLabel="Создать"
          isPending={isPending}
          error={error?.message}
          onCancel={close}
          onSubmit={(values) =>
            mutate({ ...values, createdAt: new Date().toISOString() }, { onSuccess: close })
          }
        />
      </Modal>
    </>
  )
}
