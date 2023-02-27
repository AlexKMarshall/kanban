import { PrismaClient } from '@prisma/client'
import { buildColumn } from './factories'
import { buildBoard } from './factories/board'
import { buildTask } from './factories/task'

export async function seed(
  db: PrismaClient,
  data: Parameters<typeof createSeedData>[0] = {}
) {
  const seedData = createSeedData(data)

  await Promise.all(
    seedData.board.map((board) => db.board.create({ data: board }))
  )
  await Promise.all(
    seedData.column.map((column) => db.column.create({ data: column }))
  )
  await Promise.all(seedData.task.map((task) => db.task.create({ data: task })))
}

export function createSeedData(
  overrides: {
    boards?: Array<Parameters<typeof buildBoard>[0]>
    columns?: Array<Parameters<typeof buildColumn>[0]>
    tasks?: Array<Parameters<typeof buildTask>[0]>
  } = {}
) {
  const board = (overrides.boards ?? Array.from({ length: 3 })).map(buildBoard)

  const column = (
    overrides.columns ??
    board.flatMap(({ id: boardId }) =>
      Array.from({ length: 3 }, () => ({ boardId }))
    )
  ).map(buildColumn)

  const task = (
    overrides.tasks ??
    column.flatMap(({ id: columnId }) =>
      Array.from({ length: 3 }, () => ({ columnId }))
    )
  ).map(buildTask)

  return {
    board,
    column,
    task,
  }
}
