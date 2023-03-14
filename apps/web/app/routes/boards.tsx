import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import * as styles from '../styles/boards.css'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useCurrentBoardMatchData } from './boards.$boardId'
import logoMobile from '../assets/logo-mobile.svg'
import logoDesktop from '../assets/logo-dark.svg'
import { useState } from 'react'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json({ boards })
}

export default function Boards() {
  const { boards } = useLoaderData<typeof loader>()
  const currentBoardMatchData = useCurrentBoardMatchData()
  const currentBoard = currentBoardMatchData?.board
  const heading = currentBoard?.name ?? 'Default header'

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen((v) => !v)

  return (
    <div className={styles.layout[isSidebarOpen ? 'navOpen' : 'navClosed']}>
      <div className={styles.logo}>
        <picture>
          <source media="(min-width: 768px)" srcSet={logoDesktop} />
          <img src={logoMobile} alt="" />
        </picture>
      </div>
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
        {currentBoard ? (
          <Link to={`${currentBoard.id}/new-task`}>Add new task</Link>
        ) : null}
      </header>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
        className={styles.showSidebarButton}
      >
        Show sidebar
      </button>
      <aside className={styles.sidebar} id="sidebar">
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
        <button onClick={toggleSidebar}>Hide sidebar</button>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
