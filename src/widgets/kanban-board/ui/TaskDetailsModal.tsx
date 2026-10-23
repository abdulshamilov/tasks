import { useState } from 'react'
import { PriorityBadge, type Task } from '@/entities/task'
import { DeleteTaskButton } from '@/features/task-delete'
import { EditTaskForm } from '@/features/task-edit'
import { TaskQuickSelects } from '@/features/task-quick-edit'
import { formatDate } from '@/shared/lib'
import { Button, Modal } from '@/shared/ui'

interface TaskDetailsModalProps {
  task?: Task
  onClose: () => void
}

export const TaskDetailsModal = ({ task, onClose }: TaskDetailsModalProps) => {
  const [editing, setEditing] = useState(false)

  if (!task) return null

  return (
    <Modal open onClose={onClose} title={editing ? 'Редактирование' : task.title}>
      {editing ? (
        <EditTaskForm task={task} onDone={() => setEditing(false)} />
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <PriorityBadge priority={task.priority} />
            <span>Создана {formatDate(task.createdAt)}</span>
          </div>

          <p className="break-words whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {task.description || <span className="text-slate-400 italic">Без описания</span>}
          </p>

          <TaskQuickSelects task={task} />

          <div className="flex justify-between gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <DeleteTaskButton taskId={task.id} taskTitle={task.title} onDeleted={onClose} />
            <Button onClick={() => setEditing(true)}>Редактировать</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
