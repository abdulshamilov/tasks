import {
  PRIORITIES,
  STATUSES,
  useUpdateTask,
  type Task,
  type TaskPriority,
  type TaskStatus,
  type UpdateTaskDto,
} from '@/entities/task'
import { Select } from '@/shared/ui'

export const TaskQuickSelects = ({ task }: { task: Task }) => {
  const { mutate, error } = useUpdateTask()
  const update = (dto: UpdateTaskDto) => mutate({ id: task.id, dto })

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Статус"
          options={STATUSES}
          value={task.status}
          onChange={(e) => update({ status: e.target.value as TaskStatus })}
        />
        <Select
          label="Приоритет"
          options={PRIORITIES}
          value={task.priority}
          onChange={(e) => update({ priority: e.target.value as TaskPriority })}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">Не удалось сохранить: {error.message}</p>}
    </div>
  )
}
