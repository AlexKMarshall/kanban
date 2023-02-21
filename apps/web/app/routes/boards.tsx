import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderArgs) {
  const boards = await context.db.board.findMany()

  return json({ boards, count: boards.length })
}

export default function Boards() {
  const boards = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Boards</h1>
      <pre>{JSON.stringify(boards, null, 2)}</pre>
    </div>
  )
}
