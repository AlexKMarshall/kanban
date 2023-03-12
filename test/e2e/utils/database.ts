import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@kanban/database'
import url from 'node:url'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fullBoardData } from '../mocks/boards'

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

export async function truncateDatabase(db: PrismaClient) {
  const tables: { name: string }[] =
    await db.$queryRaw`SELECT name FROM sqlite_schema WHERE type = 'table'`

  await Promise.all(
    tables.map(({ name }) => db.$executeRawUnsafe(`DELETE FROM ${name}`))
  )
}

export async function seedDatabase(
  db: PrismaClient,
  data: typeof fullBoardData
) {
  const boards = await Promise.all(
    data.boards.map((board) => db.board.create({ data: board }))
  )
  const columns = await Promise.all(
    data.columns.map((column) => db.column.create({ data: column }))
  )
  const tasks = await Promise.all(
    data.tasks.map((task) => db.task.create({ data: task }))
  )
  return { boards, columns, tasks }
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
