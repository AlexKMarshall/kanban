import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div>
      <h1>Welcome to Kanban</h1>
      <Link to="/boards">Boards</Link>
    </div>
  )
}
