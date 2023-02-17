import { type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ context }: LoaderArgs) => {
  if (context.db) {
    const boards = await context.db.board.findMany()
    console.log(boards)
  } else {
    console.log('no db')
    console.log({ context })
  }
  return [
    { name: 'Project 1', id: 1 },
    { name: 'Project new', id: 2 },
  ]
}

export default function BoardsRoute() {
  const boards = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Boards</h1>
      <pre>{JSON.stringify(boards, null, 2)}</pre>
    </div>
  )
}
