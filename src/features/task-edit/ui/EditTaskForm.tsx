import { TaskForm, useUpdateTask, type Task } from '@/entities/task'

interface EditTaskFormProps {
  task: Task
  onDone: () => void
}

export const EditTaskForm = ({ task, onDone }: EditTaskFormProps) => {
  const { mutate, isPending, error } = useUpdateTask()

  return (
    <TaskForm
      initialValues={{
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      }}
      submitLabel="Сохранить"
      isPending={isPending}
      error={error?.message}
      onCancel={onDone}
      onSubmit={(values) => mutate({ id: task.id, dto: values }, { onSuccess: onDone })}
    />
  )
}
