import { unstable_createRemixStub } from '@remix-run/testing'
import type { ServerRouteModule } from '@remix-run/server-runtime/dist/routeModules'
import { sleep } from '@kanban/clock'
import {
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
  type LoaderFunction,
} from '@remix-run/node'
import { createPrismaMock, createSeedData } from '@kanban/database/mock'

import * as IndexModule from '../app/routes'
import * as BoardsModule from '../app/routes/boards'
import { type TestContext, createTestContext } from './test-context'
import { json } from '@remix-run/server-runtime'
import type { Board } from '@kanban/database'
import { getBoards } from './mocks/boards'

type DataFunction = LoaderFunction | ActionFunction
type DataArgs = LoaderArgs | ActionArgs
type Middleware = (
  fn: DataFunction
) => (args: DataArgs) => ReturnType<DataFunction>

type TestAppStoryProps = {
  url: TestAppProps['url']
  boards: Partial<Board>[]
}

export const testAppStoryDefaultProps = {
  url: '/',
  boards: getBoards(),
}

export function TestAppStory({ url, boards }: TestAppStoryProps) {
  const context = createTestContext({
    db: createPrismaMock({ data: createSeedData({ boards }) }),
  })
  return <TestApp url={url} context={context} />
}

type TestAppProps = {
  url: string
  context: TestContext
  delay?: number
}
function TestApp({ url, context, delay = 0 }: TestAppProps) {
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
    await sleep(delay)
    return response
  }

  const RemixStub = unstable_createRemixStub([
    { path: '/', ...routeFromModule({ module: IndexModule, middleware }) },
    {
      path: '/boards',
      ...routeFromModule({ module: BoardsModule, middleware }),
    },
  ])

  return <RemixStub initialEntries={[url]} />
}

type Route = Parameters<typeof unstable_createRemixStub>[0][number]
function routeFromModule({
  module,
  middleware,
}: {
  module: Partial<ServerRouteModule>
  middleware: Middleware
}): Route {
  const Component = module.default

  return {
    // @ts-expect-error React Router types have context as optional, but we're making them required
    loader: module.loader ? middleware(module.loader) : undefined,
    element: Component ? <Component /> : undefined,
  }
}
