import type { TaskPriority } from '@/entities/task'

export type PriorityFilter = TaskPriority | 'all'
export type SortOption = 'newest' | 'oldest' | 'priority'

export interface TaskFilters {
  search: string
  priority: PriorityFilter
  sort: SortOption
}

export const DEFAULT_FILTERS: TaskFilters = {
  search: '',
  priority: 'all',
  sort: 'newest',
}
