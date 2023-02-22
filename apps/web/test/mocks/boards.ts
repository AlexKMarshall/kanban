import { boardFactory } from '@kanban/database/mock/factories/board'

export const getBoards = () => [
  boardFactory.build({ name: 'Platform launch' }),
  boardFactory.build({ name: 'Marketing plan' }),
  boardFactory.build({ name: 'Roadmap' }),
]
