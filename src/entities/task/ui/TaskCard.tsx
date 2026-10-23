import type { ReactNode } from 'react'
import { formatDate } from '@/shared/lib'
import type { Task } from '../model/types'
import { PriorityBadge } from './PriorityBadge'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  actions?: ReactNode
}

export const TaskCard = ({ task, onClick, actions }: TaskCardProps) => (
  <article
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900"
  >
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-medium break-words text-slate-900 dark:text-slate-100">{task.title}</h3>
      {actions && <div onClick={(e) => e.stopPropagation()}>{actions}</div>}
    </div>

    {task.description && (
      <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
        {task.description}
      </p>
    )}

    <div className="mt-3 flex items-center justify-between">
      <PriorityBadge priority={task.priority} />
      <time className="text-xs text-slate-400">{formatDate(task.createdAt)}</time>
    </div>
  </article>
)
