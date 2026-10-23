import { cn } from '@/shared/lib'
import { PRIORITIES } from '../model/constants'
import type { TaskPriority } from '../model/types'

const styles: Record<TaskPriority, string> = {
  low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

export const PriorityBadge = ({ priority }: { priority: TaskPriority }) => (
  <span className={cn('rounded-md px-2 py-0.5 text-xs font-medium', styles[priority])}>
    {PRIORITIES.find((p) => p.value === priority)?.label}
  </span>
)
