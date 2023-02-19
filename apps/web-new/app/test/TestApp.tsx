import { unstable_createRemixStub } from '@remix-run/testing'
import * as IndexModule from '../routes'
import type { ServerRouteModule } from '@remix-run/server-runtime/dist/routeModules'

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
])

type Route = Parameters<typeof unstable_createRemixStub>[0][number]
function routeFromModule({
  module,
}: {
  module: Partial<ServerRouteModule>
}): Route {
  const Component = module.default

  return {
    element: Component ? <Component /> : undefined,
  }
}
