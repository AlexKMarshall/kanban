import { type PrismaClient } from '@kanban/database'
import { createDb } from './utils/db.server'

export interface Context {
  db: PrismaClient
}

export function createLiveContext() {
  return {
    db: createDb(),
  }
}
