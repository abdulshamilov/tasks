import { CreateTaskButton } from '@/features/task-create'
import { KanbanBoard } from '@/widgets/kanban-board'

export const BoardPage = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Task Manager</h1>
        <CreateTaskButton />
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 py-6">
      <KanbanBoard />
    </main>
  </div>
)
