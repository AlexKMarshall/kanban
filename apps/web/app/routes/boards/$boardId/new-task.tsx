import { Form } from '@remix-run/react'

export default function BoardsBoardIdNewTaskRoute() {
  return (
    <div>
      <h2>Add new task</h2>
      <Form method="post">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </Form>
    </div>
  )
}
