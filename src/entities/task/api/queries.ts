import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskApi } from './taskApi'
import type { CreateTaskDto, UpdateTaskDto } from '../model/types'

export const taskKeys = {
  all: ['tasks'] as const,
}

export const useTasks = () =>
  useQuery({
    queryKey: taskKeys.all,
    queryFn: taskApi.getAll,
  })

const useInvalidateTasks = () => {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: taskKeys.all })
}

export const useCreateTask = () => {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: (dto: CreateTaskDto) => taskApi.create(dto),
    onSuccess: invalidate,
  })
}

export const useUpdateTask = () => {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateTaskDto }) =>
      taskApi.update(id, dto),
    onSuccess: invalidate,
  })
}

export const useDeleteTask = () => {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: (id: number) => taskApi.remove(id),
    onSuccess: invalidate,
  })
}