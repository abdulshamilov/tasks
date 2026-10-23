import type { ReactNode } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/shared/lib'

export const DraggableTask = ({ id, children }: { id: number; children: ReactNode }) => {
  const { setNodeRef, listeners, isDragging } = useDraggable({ id })

  return (
    <div ref={setNodeRef} {...listeners} className={cn(isDragging && 'opacity-40')}>
      {children}
    </div>
  )
}