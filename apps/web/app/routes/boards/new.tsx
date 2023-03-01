import { Form } from '@remix-run/react'
import { ActionArgs, redirect } from '@remix-run/server-runtime'
import { z } from 'zod'

const newBoardSchema = z.object({
  name: z.string().min(3),
})

export async function action({ context, request }: ActionArgs) {
  const formPayload = Object.fromEntries(await request.formData())

  const parsedForm = newBoardSchema.parse(formPayload)

  const board = await context.db.board.create({
    data: parsedForm,
  })

  return redirect(`/boards/${board.id}`)
}

export default function BoardsNewRoute() {
  return (
    <div>
      <h2>Add new board</h2>
      <Form method="post">
        <label htmlFor="name">Board name</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Create new board</button>
      </Form>
    </div>
  )
}
