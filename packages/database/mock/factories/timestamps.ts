import { faker } from '@faker-js/faker'

export type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

export const buildTimestamps = (
  overrides: Partial<Timestamps> = {}
): Timestamps => {
  const createdAt = overrides?.createdAt ?? faker.date.recent()
  const updatedAt =
    overrides?.updatedAt ?? faker.date.between(createdAt, new Date())

  return { createdAt, updatedAt }
}
