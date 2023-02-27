import { Column } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { buildTimestamps } from './timestamps'
import { SetRequired } from 'type-fest'

export const buildColumn = ({
  boardId,
  ...overrides
}: SetRequired<Partial<Column>, 'boardId'>): Column => {
  const id = overrides.id ?? faker.datatype.uuid()
  const name = overrides.name ?? faker.music.genre()

  return { boardId, id, name, ...buildTimestamps(overrides) }
}
