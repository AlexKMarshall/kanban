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
import * as BoardsIndexModule from '../app/routes/boards/index'
import * as BoardIdModule from '../app/routes/boards/$boardId'
import * as BoardsNewModule from '../app/routes/boards/new'
import { type TestContext, createTestContext } from './test-context'
import { json } from '@remix-run/server-runtime'
import { getFullBoardData } from './mocks/boards'
import type {
  buildBoard,
  buildColumn,
  buildTask,
} from '@kanban/database/mock/factories'

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
}

export const testAppStoryDefaultProps = {
  url: '/',
  ...getFullBoardData(),
}

export function TestAppStory({
  url,
  boards,
  columns,
  tasks,
}: TestAppStoryProps) {
  const context = createTestContext({
    db: createPrismaMock({ data: createSeedData({ boards, columns, tasks }) }),
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
    {
      path: '/',
      id: '/',
      ...routeFromModule({ module: IndexModule, middleware }),
    },
    {
      path: '/boards',
      id: 'boards',
      ...routeFromModule({
        module: BoardsModule,
        middleware,
      }),
      children: [
        // @ts-expect-error index typing is weird here
        {
          index: true,
          ...routeFromModule({
            module: BoardsIndexModule,
            middleware,
          }),
          id: 'boards/index',
        },
        // @ts-expect-error all the typing on this router is weird, probably better to move this to a separate file
        {
          path: ':boardId',
          id: 'boards/$boardId',
          ...routeFromModule({
            module: BoardIdModule,
            middleware,
          }),
        },
        // @ts-expect-error all the typing on this router is weird, probably better to move this to a separate file
        {
          path: 'new',
          id: 'boards/new',
          ...routeFromModule({
            module: BoardsNewModule,
            middleware,
          }),
        },
      ],
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
