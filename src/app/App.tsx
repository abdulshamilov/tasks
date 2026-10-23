import { QueryProvider } from './providers/QueryProvider'
import { BoardPage } from '@/pages/board'

export const App = () => (
  <QueryProvider>
    <BoardPage />
  </QueryProvider>
)
