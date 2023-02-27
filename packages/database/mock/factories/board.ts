import { Board } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { buildTimestamps } from './timestamps'

export const buildBoard = (overrides: Partial<Board> = {}): Board => {
  const id = overrides?.id ?? faker.datatype.uuid()
  const name = overrides?.name ?? faker.helpers.unique(faker.company.bsNoun)

  return { id, name, ...buildTimestamps(overrides) }
}
