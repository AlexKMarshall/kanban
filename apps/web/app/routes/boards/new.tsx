import { Response } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { ActionArgs, json, redirect } from '@remix-run/server-runtime'
import { z } from 'zod'

const newBoardBasicTypesSchema = z.object({
  name: z.string(),
})

const newBoardSchema = z.object({
  name: z.string().min(3),
})

export async function action({ context, request }: ActionArgs) {
  const formPayload = Object.fromEntries(await request.formData())

  const typeChecked = newBoardBasicTypesSchema.safeParse(formPayload)
  if (!typeChecked.success) {
    throw typeChecked.error
  }

  const typeCheckedFormPayload = typeChecked.data

  const parsedForm = newBoardSchema.safeParse(typeCheckedFormPayload)

  if (!parsedForm.success) {
    return json(
      { ...parsedForm.error.flatten(), fields: typeCheckedFormPayload },
      { status: 400 }
    )
  }

  const existingBoard = await context.db.board.findUnique({
    where: { name: parsedForm.data.name },
  })

  if (existingBoard) {
    return json(
      {
        fieldErrors: { name: ['Board name already exists'] },
        formErrors: [],
        fields: parsedForm.data,
      },
      { status: 400 }
    )
  }

  const board = await context.db.board.create({
    data: parsedForm.data,
  })

  return redirect(`/boards/${board.id}`)
}

export default function BoardsNewRoute() {
  const error = useActionData<typeof action>()
  return (
    <div>
      <h2>Add new board</h2>
      <Form method="post">
        <label htmlFor="name">Board name</label>
        <input
          type="text"
          name="name"
          id="name"
          aria-invalid={error?.fieldErrors?.name?.length ? true : undefined}
          aria-errormessage={
            error?.fieldErrors.name?.length ? 'name-error' : undefined
          }
        />
        {error?.fieldErrors.name?.length && (
          <div id="name-error">
            {error.fieldErrors.name.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        )}
        <button type="submit">Create new board</button>
      </Form>
      {Boolean(error?.formErrors?.length) && (
        <div>
          {error?.formErrors.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}
    </div>
  )
}
