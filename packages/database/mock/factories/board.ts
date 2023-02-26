import { Board } from '@prisma/client'
import { Sync } from 'factory.ts'
import { faker } from '@faker-js/faker'
import { timestamps } from './timestamps'

export const boardFactory: Sync.Factory<Board> = Sync.makeFactory({
  id: Sync.each((i) => i),
  name: Sync.each(() => faker.helpers.unique(faker.company.bsNoun)),
}).combine(timestamps)
