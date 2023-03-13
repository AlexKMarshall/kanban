import * as RadixDialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import * as styles from './Dialog.css'

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCloseComplete?: () => void
  children: ReactNode
}

export function Dialog({
  open,
  onOpenChange,
  onCloseComplete,
  children,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence onExitComplete={onCloseComplete}>
        {open && (
          <RadixDialog.Portal forceMount>
            <RadixDialog.Overlay className={styles.overlay} asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </RadixDialog.Overlay>
            <div className={styles.center}>{children}</div>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  )
}

function DropdownContent({ children }: { children: ReactNode }) {
  return (
    <RadixDialog.Content className={styles.content} asChild>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </RadixDialog.Content>
  )
}

Dialog.Content = DropdownContent

Dialog.Title = RadixDialog.Title
