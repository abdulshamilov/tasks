import { useState, type ReactNode } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { TaskCard, useUpdateTask, type Task, type TaskStatus } from '@/entities/task'

interface TaskDndContextProps {
  tasks: Task[]
  children: ReactNode
}

export const TaskDndContext = ({ tasks, children }: TaskDndContextProps) => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const { mutate } = useUpdateTask()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  )

  const activeTask = tasks.find((t) => t.id === activeId)

  const handleDragStart = ({ active }: DragStartEvent) => setActiveId(Number(active.id))

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    if (!over) return

    const task = tasks.find((t) => t.id === Number(active.id))
    const status = over.id as TaskStatus
    if (!task || task.status === status) return

    mutate({ id: task.id, dto: { status } })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      {children}
        <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="rotate-2 cursor-grabbing">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}