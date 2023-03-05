import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import * as styles from '../styles/boards.css'

export async function loader({ params, context }: LoaderArgs) {
  const { boardId: currentBoardId } = params

  const boards = await context.db.board.findMany()
  const currentBoard =
    boards.find((board) => board.id === currentBoardId) ?? null

  return json({ boards, currentBoard })
}

export default function Boards() {
  const { boards, currentBoard } = useLoaderData<typeof loader>()

  const heading = currentBoard?.name ?? 'Default header'

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.boardName}>{heading}</h1>
      </header>
      <div className={styles.nav}>
        {boards.length > 0 ? (
          <nav>
            <ul>
              {boards.map((board) => (
                <li key={board.id}>
                  <Link className={styles.board} to={`${board.id}`}>
                    {board.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <Link className={styles.board} to="new">
          Create New Board
        </Link>
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
