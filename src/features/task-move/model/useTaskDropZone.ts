import { useDroppable } from '@dnd-kit/core'
import type { TaskStatus } from '@/entities/task'

export const useTaskDropZone = (status: TaskStatus) => {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  return { setNodeRef, isOver }
}