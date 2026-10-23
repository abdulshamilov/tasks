import { useState } from 'react'
import { useDeleteTask } from '@/entities/task'
import { Button, Modal } from '@/shared/ui'

interface DeleteTaskButtonProps {
  taskId: number
  taskTitle: string
  iconOnly?: boolean
  onDeleted?: () => void
}

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
)

export const DeleteTaskButton = ({ taskId, taskTitle, iconOnly, onDeleted }: DeleteTaskButtonProps) => {
  const [open, setOpen] = useState(false)
  const { mutate, isPending, error, reset } = useDeleteTask()

  const close = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      {iconOnly ? (
        <button
          aria-label="Удалить задачу"
          onClick={() => setOpen(true)}
          className="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
        >
          <TrashIcon />
        </button>
      ) : (
        <Button variant="ghost" className="text-red-600 dark:text-red-400" onClick={() => setOpen(true)}>
          <TrashIcon /> Удалить
        </Button>
      )}

      <Modal open={open} onClose={close} title="Удалить задачу?">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Задача «<span className="font-medium break-words">{taskTitle}</span>» будет удалена без
          возможности восстановления.
        </p>

        {error && <p className="mt-3 text-sm text-red-500">Не удалось удалить: {error.message}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={close} disabled={isPending}>
            Отмена
          </Button>
          <Button
            variant="danger"
            disabled={isPending}
            onClick={() =>
              mutate(taskId, {
                onSuccess: () => {
                  close()
                  onDeleted?.()
                },
              })
            }
          >
            {isPending ? 'Удаление…' : 'Удалить'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
