import { Sync } from 'factory.ts'
import { faker } from '@faker-js/faker'

type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

export const timestamps: Sync.Factory<Timestamps> = Sync.makeFactory({
  createdAt: Sync.each(faker.date.recent),
  updatedAt: new Date(),
}).withDerivation1(['createdAt'], 'updatedAt', (createdAt) =>
  faker.date.between(createdAt, new Date())
)
