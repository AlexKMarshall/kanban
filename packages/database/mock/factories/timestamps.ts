import { Sync } from 'factory.ts'
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

export const timestamps: Sync.Factory<Timestamps> = Sync.makeFactory({
  createdAt: Sync.each(faker.date.recent),
  updatedAt: new Date(),
}).withDerivation1(['createdAt'], 'updatedAt', (createdAt) =>
  faker.date.between(createdAt, new Date())
)
