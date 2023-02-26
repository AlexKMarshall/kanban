import { Column } from '@prisma/client'
import { Sync } from 'factory.ts'
import { faker } from '@faker-js/faker'
import { buildTimestamps, Timestamps, timestamps } from './timestamps'
import { SetRequired } from 'type-fest'

export const buildColumn = ({
  boardId,
  ...overrides
}: SetRequired<Partial<Column>, 'boardId'>): Column => {
  const id = overrides.id ?? faker.helpers.unique(faker.datatype.number)
  const name = overrides.name ?? faker.helpers.unique(faker.commerce.department)

  return { boardId, id, name, ...buildTimestamps(overrides) }
}

export const column = Sync.makeFactoryWithRequired<
  Omit<Column, keyof Timestamps>,
  'boardId'
>({
  id: Sync.each((i) => i),
  name: Sync.each(() => faker.helpers.unique(faker.commerce.department)),
}).combine(timestamps)
