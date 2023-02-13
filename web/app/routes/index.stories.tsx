import type { Meta, StoryObj } from "@storybook/react"

import { TestApp } from "~/test/TestApp"

const meta: Meta<typeof TestApp> = {
  title: "Routes/index",
  component: TestApp,
  args: {
    url: "/",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
