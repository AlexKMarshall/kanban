import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json(boards)
}

export default function Boards() {
  const boards = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Boards</h1>
      {boards.length > 0 ? (
        <nav>
          <ul>
            {boards.map((board) => (
              <li key={board.id}>
                <Link to={`${board.id}`}>{board.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <p>Create a board</p>
      )}
      <Outlet />
    </div>
  )
}
