import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import * as styles from '../styles/boards.$boardId.css'
import { Button } from '../components/Button'

export async function loader({ params, context }: LoaderArgs) {
  const { boardId } = params

  const board = await context.db.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      id: true,
      name: true,
      columns: {
        select: {
          id: true,
          name: true,
          tasks: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  })

  if (!board) {
    throw new Response('Not found', { status: 404 })
  }

  return json({ board })
}

export function useCurrentBoardMatchData():
  | SerializeFrom<typeof loader>
  | undefined {
  const matches = useMatches()
  const currentBoardMatch = matches.find(
    (match) => match.id === 'routes/boards.$boardId'
  )

  return currentBoardMatch?.data
}

export default function BoardIdRoute() {
  const { board } = useLoaderData<typeof loader>()
  return (
    <div>
      <Outlet />
      {board.columns.length > 0 ? (
        <div className={styles.columnWrapper}>
          {board.columns.map((column) => (
            <div key={column.id} className={styles.column}>
              <h2 className={styles.columnName}>{column.name}</h2>
              {column.tasks.length > 0 ? (
                <ul className={styles.cardList}>
                  {column.tasks.map((task) => (
                    <li key={task.id} className={styles.card}>
                      <h3 className={styles.cardTitle}>{task.title}</h3>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Add a task</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Button>Add a column</Button>
      )}
    </div>
  )
}
