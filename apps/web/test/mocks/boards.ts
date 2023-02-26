import type { Board, Column } from '@kanban/database'
import {
  boardFactory,
  buildBoard,
  buildColumn,
} from '@kanban/database/mock/factories'
import boardData from './data.json'

export const getBoards = () => [
  boardFactory.build({ name: 'Platform launch' }),
  boardFactory.build({ name: 'Marketing plan' }),
  boardFactory.build({ name: 'Roadmap' }),
]

export const getFullBoardData = () => {
  const boards: Board[] = []
  const columns: Column[] = []

  boardData.boards.forEach((boardOverrides) => {
    const board = buildBoard(boardOverrides)
    boards.push(board)

    boardOverrides.columns.forEach((columnOverrides) => {
      const column = buildColumn({ ...columnOverrides, boardId: board.id })
      columns.push(column)
    })
  })

  return { boards, columns }
}
