import { sleep } from '@kanban/clock'
import {
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
  type LoaderFunction,
} from '@remix-run/node'
import { json } from '@remix-run/server-runtime'
import type { ServerRouteModule } from '@remix-run/server-runtime/dist/routeModules'
import { unstable_createRemixStub } from '@remix-run/testing'
import * as IndexModule from '../routes'
import * as BoardsModule from '../routes/boards'
import { type TestContext } from './test-context'

type DataFunction = LoaderFunction | ActionFunction
type DataArgs = LoaderArgs | ActionArgs
type Middleware = (
  fn: DataFunction
) => (args: DataArgs) => ReturnType<DataFunction>

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

type TestAppProps = {
  url: string
  context: TestContext
  delay?: number
}

export const TestApp = ({ url, context, delay = 0 }: TestAppProps) => {
  const middleware: Middleware = (fn) => async (args) => {
    await sleep(0)
    let response
    try {
      response = await fn({ ...args, context })
    } catch (error) {
      let response
      if (error instanceof Response) {
        response = error
      } else if (error instanceof Error) {
        response = json(
          { message: error.message, stack: error.stack },
          { status: 500 }
        )
      } else {
        response = json(
          { message: typeof error === 'string' ? error : 'unknown error' },
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
      ...routeFromModule({ module: IndexModule, middleware: middleware }),
    },
    {
      path: '/boards',
      ...routeFromModule({ module: BoardsModule, middleware: middleware }),
    },
  ])

  return <RemixStub initialEntries={[url]} />
}
