import { Meta } from '@storybook/react'
import { Button as ButtonComponent } from './Button'

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  args: {
    children: 'Button',
  },
} satisfies Meta

export const Button = {}
