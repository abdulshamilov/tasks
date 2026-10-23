import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

interface KanbanColumnProps {
  title: string
  count: number
  accent: string
  children: ReactNode
}

export const KanbanColumn = ({ title, count, accent, children }: KanbanColumnProps) => (
  <section className="flex min-h-[200px] flex-col rounded-2xl bg-slate-100/70 p-3 dark:bg-slate-900/50">
    <header className="mb-3 flex items-center gap-2 px-1">
      <span className={cn('h-2.5 w-2.5 rounded-full', accent)} />
      <h2 className="font-semibold text-slate-700 dark:text-slate-200">{title}</h2>
      <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {count}
      </span>
    </header>
    <div className="flex flex-1 flex-col gap-3">{children}</div>
  </section>
)
