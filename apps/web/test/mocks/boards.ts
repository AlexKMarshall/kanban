import type { Board, Column, Task } from '@kanban/database'
import {
  buildBoard,
  buildColumn,
  buildTask,
} from '@kanban/database/mock/factories'
import boardData from './data.json'

const getFullBoardData = () => {
  const boards: Board[] = []
  const columns: Column[] = []
  const tasks: Task[] = []

  boardData.boards.forEach((boardOverrides) => {
    const board = buildBoard(boardOverrides)
    boards.push(board)

    boardOverrides.columns.forEach((columnOverrides) => {
      const column = buildColumn({ ...columnOverrides, boardId: board.id })
      columns.push(column)

      columnOverrides.tasks.forEach((taskOverrides) => {
        const task = buildTask({ ...taskOverrides, columnId: column.id })
        tasks.push(task)
      })
    })
  })

  return { boards, columns, tasks }
}

export const fullBoardData = getFullBoardData()
