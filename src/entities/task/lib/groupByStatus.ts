import type { Task, TaskStatus } from '../model/types'

export const groupByStatus = (tasks: Task[]) => {
  const groups: Record<TaskStatus, Task[]> = { todo: [], in_progress: [], done: [] }
  for (const task of tasks) groups[task.status]?.push(task)
  return groups
}
