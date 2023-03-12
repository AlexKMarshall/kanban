import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
} from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { z } from 'zod'
import * as styles from '../styles/boards.$boardId.new-task.css'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
        title: [],
        columnId: ['Column not found'],
      },
      formErrors: [],
      fields: parsedForm.data,
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
  const error = useActionData<typeof action>()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          navigate(-1)
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} asChild>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        </Dialog.Overlay>
        <Dialog.Content className={styles.dialogContent} asChild>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Dialog.Title asChild>
              <h2>Add new task</h2>
            </Dialog.Title>
            <Form method="post">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                aria-invalid={
                  error?.fieldErrors?.title?.length ? true : undefined
                }
                aria-errormessage={
                  error?.fieldErrors?.title?.length ? 'title-error' : undefined
                }
              />
              {error?.fieldErrors?.title?.length ? (
                <ul id="title-error">
                  {error.fieldErrors.title.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              ) : null}
              <label htmlFor="column">Column</label>
              <select
                name="columnId"
                id="column"
                aria-invalid={
                  error?.fieldErrors.columnId?.length ? true : undefined
                }
                aria-errormessage={
                  error?.fieldErrors.columnId?.length
                    ? 'column-error'
                    : undefined
                }
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.name}
                  </option>
                ))}
              </select>
              {error?.fieldErrors?.columnId?.length ? (
                <ul id="column-error">
                  {error.fieldErrors.columnId.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              ) : null}
              <button type="submit">Create task</button>
            </Form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
