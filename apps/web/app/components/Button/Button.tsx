import type { ButtonHTMLAttributes } from 'react'
import * as styles from './Button.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return <button {...props} className={styles.button} />
}
