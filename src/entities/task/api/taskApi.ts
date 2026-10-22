import { api } from '@/shared/api'
import type { CreateTaskDto, Task, UpdateTaskDto } from '../model/types'

export const taskApi = {
  getAll: () => api.get<Task[]>('/tasks').then((r) => r.data),
  create: (dto: CreateTaskDto) => api.post<Task>('/tasks', dto).then((r) => r.data),
  update: (id: number, dto: UpdateTaskDto) =>
    api.patch<Task>(`/tasks/${id}`, dto).then((r) => r.data),
  remove: (id: number) => api.delete(`/tasks/${id}`),
}