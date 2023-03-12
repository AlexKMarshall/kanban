import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json, redirect } from '@remix-run/server-runtime'
import { z } from 'zod'
import * as styles from '../styles/boards.$boardId.new-task.css'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      {
        ...parsedForm.error.flatten(),
        fields: typeCheckedFormPayload,
        isSuccess: false,
        redirectTo: null,
      },
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
      isSuccess: false,
      fieldErrors: {
        title: [],
        columnId: ['Column not found'],
      },
      formErrors: [],
      fields: parsedForm.data,
      redirectTo: null,
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

  // we can't just return a redirect here because we want to animate the modal closing
  // if we return a redirect, the modal will close immediately and the animation won't play
  return json({
    isSuccess: true,
    fieldErrors: { title: [], columnId: [] },
    formErrors: [],
    field: parsedForm.data,
    redirectTo: `/boards/${boardId}`,
  })
}

// https://discord.com/channels/770287896669978684/1018657043164442725/1018657043164442725

export default function BoardsBoardIdNewTaskRoute() {
  const { columns } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const navigation = useNavigation()

  function redirect() {
    // We'll call this when the exit animation completes
    // If the user exits the modal without submitting the form we just navigate them back
    // otherwise we navigate them to wherever the action told us to
    const redirectTo = actionData?.redirectTo
    if (redirectTo) {
      return navigate(redirectTo, { replace: true })
    }
    return navigate(-1)
  }

  function closeModal() {
    setOpen(false)
  }

  useEffect(() => {
    // close the modal if submission was successful
    // wait for navigation state to be idle, this means the loaders will have re-run
    // and we can safely close the modal, triggering the exit animation
    // When the exit completes we navigate back to the board
    if (open && actionData?.isSuccess && navigation.state === 'idle') {
      closeModal()
    }
  }, [open, actionData, navigation.state, closeModal])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence onExitComplete={redirect}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className={styles.dialogOverlay} asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <div className={styles.center}>
              <Dialog.Content className={styles.dialogContent} asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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
                        actionData?.fieldErrors?.title?.length
                          ? true
                          : undefined
                      }
                      aria-errormessage={
                        actionData?.fieldErrors?.title?.length
                          ? 'title-error'
                          : undefined
                      }
                    />
                    {actionData?.fieldErrors?.title?.length ? (
                      <ul id="title-error">
                        {actionData.fieldErrors.title.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    ) : null}
                    <label htmlFor="column">Column</label>
                    <select
                      name="columnId"
                      id="column"
                      aria-invalid={
                        actionData?.fieldErrors.columnId?.length
                          ? true
                          : undefined
                      }
                      aria-errormessage={
                        actionData?.fieldErrors.columnId?.length
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
                    {actionData?.fieldErrors?.columnId?.length ? (
                      <ul id="column-error">
                        {actionData.fieldErrors.columnId.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    ) : null}
                    <button type="submit">Create task</button>
                  </Form>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
