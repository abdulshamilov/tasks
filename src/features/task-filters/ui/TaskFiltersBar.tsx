import { PRIORITIES } from '@/entities/task'
import { Button, Input, Select } from '@/shared/ui'
import { isFiltersActive } from '../lib/applyFilters'
import type { PriorityFilter, SortOption, TaskFilters } from '../model/types'

const PRIORITY_OPTIONS = [{ value: 'all', label: 'Все приоритеты' }, ...PRIORITIES]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'oldest', label: 'Сначала старые' },
  { value: 'priority', label: 'По приоритету' },
]

interface TaskFiltersBarProps {
  filters: TaskFilters
  onChange: (patch: Partial<TaskFilters>) => void
  onReset: () => void
}

export const TaskFiltersBar = ({ filters, onChange, onReset }: TaskFiltersBarProps) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="flex-1">
      <Input
        type="search"
        placeholder="Поиск по названию…"
        aria-label="Поиск по названию"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />
    </div>

    <div className="grid grid-cols-2 gap-3 sm:flex">
      <Select
        aria-label="Фильтр по приоритету"
        options={PRIORITY_OPTIONS}
        value={filters.priority}
        onChange={(e) => onChange({ priority: e.target.value as PriorityFilter })}
      />
      <Select
        aria-label="Сортировка"
        options={SORT_OPTIONS}
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as SortOption })}
      />
    </div>

    {isFiltersActive(filters) && (
      <Button variant="ghost" onClick={onReset}>
        Сбросить
      </Button>
    )}
  </div>
)
