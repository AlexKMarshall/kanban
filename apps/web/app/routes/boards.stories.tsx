import type { Meta, StoryObj } from '@storybook/react'

import { TestAppStory } from '../test/TestApp'

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards',
  component: TestAppStory,
  args: {
    url: '/boards',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
