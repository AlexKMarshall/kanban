import { Form } from '@remix-run/react'

export default function BoardsNewRoute() {
  return (
    <div>
      <h2>Add new board</h2>
      <Form>
        <label htmlFor="name">Board name</label>
        <input type="text" name="name" id="name" />
        <button type="submit">Create new board</button>
      </Form>
    </div>
  )
}
