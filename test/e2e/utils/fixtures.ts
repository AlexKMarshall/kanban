import { test as base, expect } from '@playwright/test'
import { prepareDatabase, removeDatabase } from './database.js'
import { startServer } from './server.js'

type WorkerFixtures = {
  database: Awaited<ReturnType<typeof prepareDatabase>>
  server: { port: number }
}

const test = base.extend<{}, WorkerFixtures>({
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
})

export { test, expect }
