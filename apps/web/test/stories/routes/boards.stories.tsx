import type { Meta, StoryObj } from '@storybook/react'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: '/boards',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
