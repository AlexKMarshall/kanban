import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params, context }: LoaderArgs) {
  const { boardId } = params

  const board = await context.db.board.findUnique({
    where: {
      id: Number(boardId),
    },
    select: {
      id: true,
      name: true,
      columns: {
        select: {
          id: true,
          name: true,
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
        <ul>
          {board.columns.map((column) => (
            <li key={column.id}>{column.name}</li>
          ))}
        </ul>
      ) : (
        <p>Add a column</p>
      )}
    </div>
  )
}
