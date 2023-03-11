import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@kanban/database'
import url from 'node:url'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'

function generateDatabaseUrl() {
  return `file:./test/${randomUUID()}.db`
}

function migrateDatabase(url: string) {
  try {
    const scriptRun = execSync(
      `pnpm --filter database db:push --accept-data-loss`,
      {
        env: { ...process.env, NODE_ENV: 'test', DATABASE_URL: url },
      }
    )
    console.log(scriptRun.toString())
  } catch (error) {
    console.log('something went wrong migrating the database')
    console.error(error)
  }
}

function getPrismaClient(url: string) {
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  })
}

export async function prepareDatabase() {
  const databaseUrl = generateDatabaseUrl()
  await migrateDatabase(databaseUrl)
  const client = getPrismaClient(databaseUrl)
  return { databaseUrl, client }
}

export async function removeDatabase(databaseUrl: string) {
  const relativePath = url.fileURLToPath(databaseUrl)
  const fullPath = path.join(
    __dirname,
    '../../../packages/database/prisma',
    relativePath
  )
  return fsPromises.unlink(fullPath)
}
