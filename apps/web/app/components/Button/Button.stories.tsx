import { Meta, StoryObj } from '@storybook/react'
import { Button as ButtonComponent, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  args: {
    children: 'Button',
  },
} satisfies Meta

export const Button = {}
