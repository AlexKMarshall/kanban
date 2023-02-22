import { PrismaClient } from '@prisma/client'
import { PrismaMockData } from '../prisma-mock'
import { boardFactory } from './factories/board'

export async function seed(
  db: PrismaClient,
  data: Parameters<typeof createSeedData>[0] = {}
) {
  const seedData = createSeedData(data)

  Promise.all(seedData.board.map((board) => db.board.create({ data: board })))
}

export function createSeedData(
  overrides: {
    boards?: Array<Parameters<typeof boardFactory.build>[0]>
  } = {}
) {
  const board = (overrides.boards ?? Array.from({ length: 3 })).map(
    boardFactory.build
  )
  return {
    board,
  }
}
