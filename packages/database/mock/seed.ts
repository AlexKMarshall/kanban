import { Board, PrismaClient } from '@prisma/client'
import { PrismaMockData } from '../prisma-mock'
import { buildColumn } from './factories'
import { boardFactory, buildBoard } from './factories/board'

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
}

export function createSeedData(
  overrides: {
    boards?: Array<Parameters<typeof buildBoard>[0]>
    columns?: Array<Parameters<typeof buildColumn>[0]>
  } = {}
) {
  const data: PrismaMockData<PrismaClient> = {
    board: [],
    column: [],
  }

  const board = (overrides.boards ?? Array.from({ length: 3 })).map(buildBoard)

  const column = (
    overrides.columns ??
    board.flatMap(({ id: boardId }) =>
      Array.from({ length: 3 }, () => ({ boardId }))
    )
  ).map(buildColumn)

  return {
    board,
    column,
  }
}
