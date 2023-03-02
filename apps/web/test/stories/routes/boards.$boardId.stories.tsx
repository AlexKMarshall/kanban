import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { fullBoardData } from '../../mocks/boards'

import { TestAppStory, testAppStoryDefaultProps } from '../../TestApp'

const [firstBoard] = fullBoardData.boards

const meta: Meta<typeof TestAppStory> = {
  title: 'Routes/boards/$boardId',
  component: TestAppStory,
  args: {
    ...testAppStoryDefaultProps,
    url: `/boards/${firstBoard.id}`,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
