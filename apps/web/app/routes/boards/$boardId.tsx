import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Fragment } from 'react'

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
              name: true,
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

export default function BoardIdRoute() {
  const { board } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>{board.name}</h1>
      {board.columns.length > 0 ? (
        <>
          {board.columns.map((column) => (
            <Fragment key={column.id}>
              <h2>{column.name}</h2>
              {column.tasks.length > 0 ? (
                <ul>
                  {column.tasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Add a task</p>
              )}
            </Fragment>
          ))}
        </>
      ) : (
        <p>Add a column</p>
      )}
    </div>
  )
}
