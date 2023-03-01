import { Form, useLoaderData } from '@remix-run/react'
import {
  ActionArgs,
  json,
  LoaderArgs,
  redirect,
} from '@remix-run/server-runtime'
import { z } from 'zod'

export async function loader({ params, context }: LoaderArgs) {
  const { boardId } = params
  if (!boardId) {
    throw new Error('Missing boardId')
  }

  const columns = await context.db.column.findMany({
    where: {
      boardId,
    },
  })

  if (!columns) {
    throw new Error('No columns found')
  }

  return json({ columns })
}

const newTaskBasicTypesSchema = z.object({
  title: z.string(),
  columnId: z.string(),
})
const newTaskSchema = z.object({
  title: z.string().min(3),
  columnId: z.string(),
})

export async function action({ params, request, context }: ActionArgs) {
  const { boardId } = params
  if (!boardId) {
    throw new Error('Missing boardId')
  }

  const formPayload = Object.fromEntries(await request.formData())

  const typeChecked = newTaskBasicTypesSchema.safeParse(formPayload)
  if (!typeChecked.success) {
    throw typeChecked.error
  }

  const typeCheckedFormPayload = typeChecked.data

  const parsedForm = newTaskSchema.safeParse(typeCheckedFormPayload)

  if (!parsedForm.success) {
    return json(
      { ...parsedForm.error.flatten(), fields: typeCheckedFormPayload },
      { status: 400 }
    )
  }

  const column = await context.db.column.findUnique({
    where: {
      id: parsedForm.data.columnId,
    },
  })

  if (!column) {
    return json({
      fieldErrors: {
        columnId: ['Column not found'],
        formErrors: [],
        fields: parsedForm.data,
      },
    })
  }

  const task = await context.db.task.create({
    data: {
      title: parsedForm.data.title,
      column: {
        connect: {
          id: column.id,
        },
      },
    },
  })

  return redirect(`/boards/${boardId}`)
}

export default function BoardsBoardIdNewTaskRoute() {
  const { columns } = useLoaderData<typeof loader>()

  return (
    <div>
      <h2>Add new task</h2>
      <Form method="post">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="column">Column</label>
        <select name="columnId" id="column">
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.name}
            </option>
          ))}
        </select>
        <button type="submit">Create task</button>
      </Form>
    </div>
  )
}
