import { useState } from 'react'
import { DEFAULT_FILTERS, type TaskFilters } from './types'

export const useTaskFilters = () => {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)

  const update = (patch: Partial<TaskFilters>) => setFilters((prev) => ({ ...prev, ...patch }))
  const reset = () => setFilters(DEFAULT_FILTERS)

  return { filters, update, reset }
}
