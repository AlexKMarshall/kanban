import { unstable_createRemixStub } from '@remix-run/testing'
import type { ServerRouteModule } from '@remix-run/server-runtime/dist/routeModules'

import {
  type ActionArgs,
  type ActionFunction,
  type LoaderArgs,
  type LoaderFunction,
} from '@remix-run/node'
import * as IndexModule from '../app/routes/_index'
import * as BoardsModule from '../app/routes/boards'
import * as BoardsIndexModule from '../app/routes/boards._index'
import * as BoardIdModule from '../app/routes/boards.$boardId'
import * as BoardsNewModule from '../app/routes/boards.new'
import * as BoardsBoardIdNewTaskModule from '../app/routes/boards.$boardId.new-task'

type DataFunction = LoaderFunction | ActionFunction
type DataArgs = LoaderArgs | ActionArgs
type Middleware = (
  fn: DataFunction
) => (args: DataArgs) => ReturnType<DataFunction>

export const createRouter = (middleware: Middleware) =>
  unstable_createRemixStub([
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
        // @ts-expect-error types are weird, hopefully this will get fixex in remix
        {
          index: true,
          ...routeFromModule({
            module: BoardsIndexModule,
            middleware,
          }),
          id: 'boards/index',
        },
        {
          path: ':boardId',
          id: 'boards/$boardId',
          ...routeFromModule({
            module: BoardIdModule,
            middleware,
          }),
          children: [
            // @ts-expect-error types are weird, hopefully this will get fixex in remix
            {
              path: 'new-task',
              ...routeFromModule({
                module: BoardsBoardIdNewTaskModule,
                middleware,
              }),
              id: 'boards/$boardId/new-task',
            },
          ],
        },
        // @ts-expect-error types are weird, hopefully this will get fixex in remix
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
    // @ts-expect-error React Router types have context as optional, but we're making them required
    action: module.action ? middleware(module.action) : undefined,
    element: Component ? <Component /> : undefined,
    handle: module.handle,
  }
}
