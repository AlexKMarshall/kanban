import { test as base, expect } from '@playwright/test'
import { fullBoardData } from '../mocks/boards'
import {
  prepareDatabase,
  removeDatabase,
  seedDatabase,
  truncateDatabase,
} from './database'
import { startServer } from './server'

type TestFixtures = {
  seedData: typeof fullBoardData
}

type WorkerFixtures = {
  database: Awaited<ReturnType<typeof prepareDatabase>>
  server: { port: number }
}

const test = base.extend<TestFixtures, WorkerFixtures>({
  database: [
    async ({}, use) => {
      const database = await prepareDatabase()
      await use(database)
      await removeDatabase(database.databaseUrl)
    },
    { scope: 'worker' },
  ],
  server: [
    async ({ database }, use, workerInfo) => {
      const port = 4000 + workerInfo.workerIndex
      const server = await startServer({
        databaseUrl: database.databaseUrl,
        port,
      })

      await use({ port })
      await server.stop()
    },
    { scope: 'worker', auto: true },
  ],
  seedData: async ({}, use) => {
    await use(fullBoardData)
  },
  baseURL: async ({ server }, use) => {
    await use(`http://localhost:${server.port}`)
  },
  page: async ({ page: pageBase, seedData, database }, use) => {
    await truncateDatabase(database.client)
    await seedDatabase(database.client, seedData)
    await use(pageBase)
  },
})

export { test, expect }
