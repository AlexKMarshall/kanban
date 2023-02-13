// import type { StorybookConfig } from "@storybook/react-vite"

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    "../app/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
}

module.exports = config
