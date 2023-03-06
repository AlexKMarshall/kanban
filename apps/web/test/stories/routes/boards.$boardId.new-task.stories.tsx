import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { fullBoardData } from '../../mocks/boards'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'
import { sleep } from '@kanban/clock'

const [firstBoard] = fullBoardData.boards

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards/$boardId/new-task',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: `/boards/${firstBoard.id}/new-task`,
  },
  parameters: {
    chromatic: { viewports: [320, 768, 1440] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Valid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dialog = within(await canvas.findByRole('dialog'))

    await sleep(1)
    await userEvent.type(await dialog.findByLabelText(/title/i), 'New task')
    await userEvent.click(
      await dialog.findByRole('button', { name: /create task/i })
    )
  },
}

export const MissingTitle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const dialog = within(await canvas.findByRole('dialog'))

    await sleep(1)

    await userEvent.click(
      await dialog.findByRole('button', { name: /create task/i })
    )
  },
}
