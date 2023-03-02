import type { Meta, StoryObj } from '@storybook/react'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/index',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: '/',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
