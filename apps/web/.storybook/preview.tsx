import React from 'react'
import '../app/styles/root.css'
import { Decorator } from '@storybook/react'
import { AnimationProvider } from '../app/components/Animation'
import isChromatic from 'chromatic/isChromatic'

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <AnimationProvider disableAnimations={isChromatic()}>
      <Story />
    </AnimationProvider>
  ),
] satisfies Decorator[]
