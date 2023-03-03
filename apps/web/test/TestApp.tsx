import { sleep } from '@kanban/clock'
import {
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
  type LoaderFunction,
} from '@remix-run/node'
import { createPrismaMock, createSeedData } from '@kanban/database/mock'
import * as styles from '../app/styles/root.css'

import { type TestContext, createTestContext } from './test-context'
import { json } from '@remix-run/server-runtime'
import { fullBoardData } from './mocks/boards'
import type {
  buildBoard,
  buildColumn,
  buildTask,
} from '@kanban/database/mock/factories'
import { createRouter } from './router'

type DataFunction = LoaderFunction | ActionFunction
type DataArgs = LoaderArgs | ActionArgs
type Middleware = (
  fn: DataFunction
) => (args: DataArgs) => ReturnType<DataFunction>

type TestAppStoryProps = {
  url: TestAppProps['url']
  boards: Array<Parameters<typeof buildBoard>[0]>
  columns: Array<Parameters<typeof buildColumn>[0]>
  tasks: Array<Parameters<typeof buildTask>[0]>
  connection: 'instant' | 'very fast' | 'fast' | 'slow' | 'very slow'
}

export const testAppStoryDefaultProps = {
  url: '/',
  ...fullBoardData,
  connection: 'very fast',
} satisfies Partial<TestAppStoryProps>

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const networkDelayMap: Record<TestAppStoryProps['connection'], () => number> = {
  instant: () => 0,
  'very fast': () => randomBetween(0, 100),
  fast: () => randomBetween(100, 500),
  slow: () => randomBetween(500, 1000),
  'very slow': () => randomBetween(1000, 2000),
}

export function TestAppStory({
  url,
  boards,
  columns,
  tasks,
  connection,
}: TestAppStoryProps) {
  const context = createTestContext({
    db: createPrismaMock({ data: createSeedData({ boards, columns, tasks }) }),
  })
  return (
    <TestApp url={url} context={context} delay={networkDelayMap[connection]} />
  )
}

type TestAppProps = {
  url: string
  context: TestContext
  delay?: () => number
}
function TestApp({ url, context, delay = () => 0 }: TestAppProps) {
  const middleware: Middleware = (fn) => async (args) => {
    await sleep(0)
    let response
    try {
      response = await fn({ ...args, context })
    } catch (error) {
      if (error instanceof Response) {
        response = error
      } else if (error instanceof Error) {
        response = json(
          { message: error.message, stack: error.stack },
          { status: 500 }
        )
      } else {
        response = json(
          { message: typeof error === 'string' ? error : 'Unknown error' },
          { status: 500 }
        )
      }
      throw response
    }
    await sleep(delay())
    return response
  }

  const Router = createRouter(middleware)

  return (
    <div className={styles.globalStyleWorkaround}>
      <Router initialEntries={[url]} />
    </div>
  )
}
