import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskApi } from './taskApi'
import type { CreateTaskDto, Task, UpdateTaskDto } from '../model/types'

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
  const qc = useQueryClient()
  const invalidate = useInvalidateTasks()

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateTaskDto }) => taskApi.update(id, dto),

    onMutate: async ({ id, dto }) => {
      await qc.cancelQueries({ queryKey: taskKeys.all })
      const previous = qc.getQueryData<Task[]>(taskKeys.all)
      qc.setQueryData<Task[]>(taskKeys.all, (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...dto } : t)),
      )
      return { previous }
    },

    onError: (_error, _vars, context) => {
      if (context?.previous) qc.setQueryData(taskKeys.all, context.previous)
    },

    onSettled: invalidate,
  })
}

export const useDeleteTask = () => {
  const invalidate = useInvalidateTasks()
  return useMutation({
    mutationFn: (id: number) => taskApi.remove(id),
    onSuccess: invalidate,
  })
}
