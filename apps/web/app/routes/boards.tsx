import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import * as styles from '../styles/boards.css'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useCurrentBoardMatchData } from './boards.$boardId'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json({ boards })
}

export default function Boards() {
  const { boards } = useLoaderData<typeof loader>()
  const currentBoardMatchData = useCurrentBoardMatchData()
  const currentBoard = currentBoardMatchData?.board

  const heading = currentBoard?.name ?? 'Default header'

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.boardName}>{heading}</h1>
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={styles.mobileNavTrigger}>
                {heading}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <ul>
                  {boards.map((board) => (
                    <NavigationMenu.Link key={board.id} asChild>
                      <Link className={styles.board} to={`${board.id}`}>
                        {board.name}
                      </Link>
                    </NavigationMenu.Link>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
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
