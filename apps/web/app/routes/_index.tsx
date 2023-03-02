import { Link } from '@remix-run/react'
import * as styles from '../styles/_index.css'

export default function Index() {
  return (
    <div>
      <h1 className={styles.heading}>Welcome to Kanban</h1>
      <Link to="/boards">Boards</Link>
    </div>
  )
}
