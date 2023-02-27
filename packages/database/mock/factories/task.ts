import { Task } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { buildTimestamps } from './timestamps'
import { SetRequired } from 'type-fest'

export const buildTask = ({
  columnId,
  ...overrides
}: SetRequired<Partial<Task>, 'columnId'>): Task => {
  const id = overrides.id ?? faker.datatype.uuid()
  const title = overrides.title ?? faker.company.catchPhrase()

  return { columnId, id, title, ...buildTimestamps(overrides) }
}
