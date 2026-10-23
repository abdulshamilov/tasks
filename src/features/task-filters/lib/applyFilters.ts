import type { Task, TaskPriority } from '@/entities/task'
import type { TaskFilters } from '../model/types'

const PRIORITY_WEIGHT: Record<TaskPriority, number> = { high: 3, medium: 2, low: 1 }

export const isFiltersActive = ({ search, priority }: TaskFilters) =>
  search.trim() !== '' || priority !== 'all'

export const applyFilters = (tasks: Task[], { search, priority, sort }: TaskFilters) => {
  const query = search.trim().toLowerCase()

  return tasks
    .filter(
      (t) =>
        (priority === 'all' || t.priority === priority) &&
        (!query || t.title.toLowerCase().includes(query)),
    )
    .sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return a.createdAt.localeCompare(b.createdAt)
        case 'priority':
          return (
            PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority] ||
            b.createdAt.localeCompare(a.createdAt)
          )
        default:
          return b.createdAt.localeCompare(a.createdAt)
      }
    })
}
