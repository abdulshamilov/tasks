import { useMemo, useState } from 'react'
import { STATUSES, TaskCard, groupByStatus, useTasks, type TaskStatus } from '@/entities/task'
import { DeleteTaskButton } from '@/features/task-delete'
import { applyFilters, isFiltersActive, type TaskFilters } from '@/features/task-filters'
import { DraggableTask, TaskDndContext } from '@/features/task-move'
import { Button, Spinner } from '@/shared/ui'
import { KanbanColumn } from './KanbanColumn'
import { TaskDetailsModal } from './TaskDetailsModal'

const ACCENTS: Record<TaskStatus, string> = {
  todo: 'bg-slate-400',
  in_progress: 'bg-indigo-500',
  done: 'bg-emerald-500',
}

interface KanbanBoardProps {
  filters: TaskFilters
  onResetFilters: () => void
}

export const KanbanBoard = ({ filters, onResetFilters }: KanbanBoardProps) => {
  const { data, isLoading, isError, error, refetch } = useTasks()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const visible = useMemo(() => applyFilters(data ?? [], filters), [data, filters])
  const groups = useMemo(() => groupByStatus(visible), [visible])
  const selectedTask = data?.find((t) => t.id === selectedId)
  const filtered = isFiltersActive(filters)

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
    <>
      {filtered && visible.length === 0 && (
        <div className="mb-4 flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">По заданным условиям ничего не найдено</p>
          <Button variant="secondary" onClick={onResetFilters}>
            Сбросить фильтры
          </Button>
        </div>
      )}

      <TaskDndContext tasks={data ?? []}>
        <div className="grid gap-4 md:grid-cols-3">
          {STATUSES.map(({ value, label }) => (
            <KanbanColumn
              key={value}
              status={value}
              title={label}
              count={groups[value].length}
              accent={ACCENTS[value]}
            >
              {groups[value].length ? (
                groups[value].map((task) => (
                  <DraggableTask key={task.id} id={task.id}>
                    <TaskCard
                      task={task}
                      onClick={() => setSelectedId(task.id)}
                      actions={<DeleteTaskButton iconOnly taskId={task.id} taskTitle={task.title} />}
                    />
                  </DraggableTask>
                ))
              ) : (
                <p className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-8 text-sm text-slate-400 dark:border-slate-800">
                  {filtered ? 'Ничего не найдено' : 'Нет задач'}
                </p>
              )}
            </KanbanColumn>
          ))}
        </div>
      </TaskDndContext>

      <TaskDetailsModal
        key={selectedId ?? 'none'}
        task={selectedTask}
        onClose={() => setSelectedId(null)}
      />
    </>
  )
}