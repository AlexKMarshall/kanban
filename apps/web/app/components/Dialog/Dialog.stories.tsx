import { Meta } from '@storybook/react'
import { Dialog as DialogComponent } from './Dialog'

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
  args: {
    open: true,
    onOpenChange: () => {},
    onCloseComplete: () => {},
    children: <DialogComponent.Content>Dialog content</DialogComponent.Content>,
  },
} satisfies Meta<typeof DialogComponent>

export const Dialog = {}
