import { test as base, expect } from '@playwright/test'
import getPort from 'get-port'
import { startServer } from './server.js'

type WorkerFixtures = {
  server: { port: number }
}

const test = base.extend<{}, WorkerFixtures>({
  server: [
    async ({}, use, workerInfo) => {
      const port = await getPort({ port: 3000 + workerInfo.workerIndex })
      const server = await startServer({ databaseUrl: 'file:./test.db', port })

      await use({ port })
      console.log(`Stopping server on port ${port}...`)
      await server.stop()
    },
    { scope: 'worker', auto: true },
  ],
})

export { test, expect }
