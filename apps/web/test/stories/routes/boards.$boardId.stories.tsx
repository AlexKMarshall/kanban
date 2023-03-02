import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards/$boardId',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: '/boards',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(
    await canvas.findByRole('link', { name: /platform launch/i })
  )
}
