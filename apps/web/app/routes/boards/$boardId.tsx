import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params, context }: LoaderArgs) {
  const { boardId } = params

  const board = await context.db.board.findUnique({
    where: {
      id: Number(boardId),
    },
  })

  if (!board) {
    throw new Response('Not found', { status: 404 })
  }

  return json({ board })
}

export default function BoardIdRoute() {
  const { board } = useLoaderData<typeof loader>()
  return <h1>{board.name}</h1>
}
