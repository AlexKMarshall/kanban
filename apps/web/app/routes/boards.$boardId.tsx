import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import * as styles from '../styles/boards.$boardId.css'

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

// https://sergiodxa.com/articles/bubble-up-data-on-remix-routes#bubbling-components
type HeaderProps = {
  data: SerializeFrom<typeof loader>
}
function Header({ data }: HeaderProps) {
  const { board } = data
  return (
    <header>
      <h1 className={styles.boardName}>{board.name}</h1>
    </header>
  )
}

export const handle = {
  Header,
}

export default function BoardIdRoute() {
  const { board } = useLoaderData<typeof loader>()
  return (
    <div>
      <Outlet />
      {board.columns.length > 0 ? (
        <div className={styles.columnWrapper}>
          {board.columns.map((column) => (
            <div key={column.id}>
              <h2>{column.name}</h2>
              {column.tasks.length > 0 ? (
                <ul>
                  {column.tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              ) : (
                <p>Add a task</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Add a column</p>
      )}
    </div>
  )
}
