import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards/new',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: '/boards/new',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Valid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(
      await canvas.findByLabelText(/board name/i),
      'New board'
    )

    await userEvent.click(
      await canvas.findByRole('button', { name: /create new board/i })
    )
  },
}
