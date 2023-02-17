import { PrismaClient } from '@kanban/database'

export const createDb = () => new PrismaClient()
