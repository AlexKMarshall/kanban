import { unstable_createRemixStub } from '@remix-run/testing'
import type { ServerRouteModule } from '@remix-run/server-runtime/dist/routeModules'

import * as IndexModule from '../routes'
import * as BoardsModule from '../routes/boards'

type TestAppStoryProps = {
  url: TestAppProps['url']
}

export function TestAppStory({ url }: TestAppStoryProps) {
  return <TestApp url={url} />
}

type TestAppProps = {
  url: string
}
function TestApp({ url }: TestAppProps) {
  return <RemixStub initialEntries={[url]} />
}

const RemixStub = unstable_createRemixStub([
  { path: '/', ...routeFromModule({ module: IndexModule }) },
  { path: '/boards', ...routeFromModule({ module: BoardsModule }) },
])

type Route = Parameters<typeof unstable_createRemixStub>[0][number]
function routeFromModule({
  module,
}: {
  module: Partial<ServerRouteModule>
}): Route {
  const Component = module.default

  return {
    // @ts-expect-error React Router types have context as optional, but we're making them required
    loader: module.loader ? module.loader : undefined,
    element: Component ? <Component /> : undefined,
  }
}
