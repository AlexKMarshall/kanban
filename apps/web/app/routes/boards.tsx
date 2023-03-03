import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { ComponentType } from 'react'
import * as styles from '../styles/boards.css'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json(boards)
}

function PageHeader() {
  const matches = useMatches()
  const match = matches
    .filter(
      (match) =>
        match.handle &&
        'Header' in match.handle &&
        typeof match.handle.Header === 'function'
    )
    .at(-1)

  if (!match?.handle)
    return (
      <header>
        <h1>Default Header</h1>
      </header>
    )

  const Header = match.handle.Header as ComponentType<{ data: any }>
  return <Header data={match.data} />
}

export default function Boards() {
  const boards = useLoaderData<typeof loader>()

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <PageHeader />
      </div>
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
