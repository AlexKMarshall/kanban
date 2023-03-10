import { globalStyle, style } from '@vanilla-extract/css'

export const globalStyleWorkaround = style({})
// CSS Reset
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('*', {
  margin: 0,
})

globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('input, button, textarea, select', {
  font: 'inherit',
})

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word',
})

globalStyle('body', {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
})

globalStyle('ul, ol', {
  listStyleType: 'none',
  padding: 0,
})
