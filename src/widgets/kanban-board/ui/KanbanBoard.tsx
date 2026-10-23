import { useMemo } from 'react'
import { STATUSES, TaskCard, groupByStatus, useTasks, type TaskStatus } from '@/entities/task'
import { Button, Spinner } from '@/shared/ui'
import { KanbanColumn } from './KanbanColumn'

const ACCENTS: Record<TaskStatus, string> = {
  todo: 'bg-slate-400',
  in_progress: 'bg-indigo-500',
  done: 'bg-emerald-500',
}

export const KanbanBoard = () => {
  const { data, isLoading, isError, error, refetch } = useTasks()
  const groups = useMemo(() => groupByStatus(data ?? []), [data])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
        <p className="font-medium text-red-700 dark:text-red-400">Не удалось загрузить задачи</p>
        <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">{error.message}</p>
        <Button variant="danger" className="mt-4" onClick={() => refetch()}>
          Повторить
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STATUSES.map(({ value, label }) => (
        <KanbanColumn key={value} title={label} count={groups[value].length} accent={ACCENTS[value]}>
          {groups[value].length ? (
            groups[value].map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-8 text-sm text-slate-400 dark:border-slate-800">
              Нет задач
            </p>
          )}
        </KanbanColumn>
      ))}
    </div>
  )
}
