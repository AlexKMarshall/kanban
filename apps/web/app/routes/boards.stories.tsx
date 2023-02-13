import type { Meta, StoryObj } from "@storybook/react"

import { TestApp } from "~/test/TestApp"

const meta: Meta<typeof TestApp> = {
  title: "Routes/boards",
  component: TestApp,
  args: {
    url: "/boards",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
