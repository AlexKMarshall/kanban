import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { fullBoardData } from '../../mocks/boards'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const [firstBoard] = fullBoardData.boards

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards/$boardId/new-task',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: `/boards/${firstBoard.id}/new-task`,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Valid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(await canvas.findByLabelText(/title/i), 'New task')
    await userEvent.click(
      await canvas.findByRole('button', { name: /create task/i })
    )
  },
}
