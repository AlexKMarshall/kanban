import { unstable_createRemixStub } from '@remix-run/testing'
import IndexRoute from '~/routes'
import BoardsRoute, { loader as boardsLoader } from '~/routes/boards'

type TestAppProps = {
	url: string
}

export const TestApp = ({ url }: TestAppProps) => {
	const RemixStub = unstable_createRemixStub([
		{
			path: '/',
			element: <IndexRoute />,
		},
		{
			path: '/boards',
			element: <BoardsRoute />,
			loader: boardsLoader,
		},
	])

	return <RemixStub initialEntries={[url]} />
}
