import { Board } from '@prisma/client'
import { Sync } from 'factory.ts'
import { faker } from '@faker-js/faker'

type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

const timestamps: Sync.Factory<Timestamps> = Sync.makeFactory({
  createdAt: Sync.each(faker.date.recent),
  updatedAt: new Date(),
}).withDerivation1(['createdAt'], 'updatedAt', (createdAt) =>
  faker.date.between(createdAt, new Date())
)

export const boardFactory: Sync.Factory<Board> = Sync.makeFactory({
  id: Sync.each((i) => i),
  name: Sync.each(() => faker.helpers.unique(faker.company.bsNoun)),
}).combine(timestamps)
