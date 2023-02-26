import { Board, Column } from '@prisma/client'
import { Sync } from 'factory.ts'
import { faker } from '@faker-js/faker'
import { buildTimestamps, timestamps } from './timestamps'

export const buildBoard = (overrides: Partial<Board> = {}): Board => {
  const id = overrides?.id ?? faker.helpers.unique(faker.datatype.number)
  const name = overrides?.name ?? faker.helpers.unique(faker.company.bsNoun)

  return { id, name, ...buildTimestamps(overrides) }
}

export const boardFactory: Sync.Factory<Board> = Sync.makeFactory({
  id: Sync.each((i) => i),
  name: Sync.each(() => faker.helpers.unique(faker.company.bsNoun)),
}).combine(timestamps)
