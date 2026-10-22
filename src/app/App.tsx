import { QueryProvider } from './providers/QueryProvider'
import { useTasks } from '@/entities/task'

const Test = () => {
  const { data, isLoading, error } = useTasks()
  if (isLoading) return <p>Загрузка…</p>
  if (error) return <p>Ошибка: {error.message}</p>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const App = () => (
  <QueryProvider>
    <Test />
  </QueryProvider>
)