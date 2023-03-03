import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import * as styles from '../styles/boards.css'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json(boards)
}

export default function Boards() {
  const boards = useLoaderData<typeof loader>()
  return (
    <div className={styles.layout}>
      <h1 className={styles.header}>Boards</h1>
      <div className={styles.nav}>
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
        ) : null}
        <Link to="new">Create New Board</Link>
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
