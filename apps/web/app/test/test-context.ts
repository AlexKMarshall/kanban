import { createPrismaMock } from '@kanban/database/mock'
import { type Context } from '../context'

export type TestContext = ReturnType<typeof createTestContext>

export function createTestContext({ db }: Partial<Context>) {
  return {
    db: db ?? createPrismaMock(),
  }
}