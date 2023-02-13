import { Link } from "@remix-run/react"

export default function Index() {
  return (
    <div>
      <h1>Welcome to Kanban</h1>
      <p>Start by creating a new board</p>
      <Link to="/boards">Go to boards</Link>
    </div>
  )
}
