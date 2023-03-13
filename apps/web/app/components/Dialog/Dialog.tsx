import * as RadixDialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useAnimation } from '../Animation'
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
  const { disableAnimations } = useAnimation()
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence onExitComplete={onCloseComplete}>
        {open && (
          <RadixDialog.Portal forceMount>
            <RadixDialog.Overlay className={styles.overlay} asChild>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: disableAnimations ? 0 : undefined },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: disableAnimations ? 0 : undefined },
                }}
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
  const { disableAnimations } = useAnimation()
  return (
    <RadixDialog.Content className={styles.content} asChild>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: disableAnimations ? 0 : undefined },
        }}
        exit={{
          opacity: 0,
          transition: { duration: disableAnimations ? 0 : undefined },
        }}
      >
        {children}
      </motion.div>
    </RadixDialog.Content>
  )
}

Dialog.Content = DropdownContent

Dialog.Title = RadixDialog.Title
