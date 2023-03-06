import { style } from '@vanilla-extract/css'

export const dialogOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'hsl(0 0% 0% / 0.5)',
})

export const dialogContent = style({
  backgroundColor: 'white',
  position: 'fixed',
  top: 0,
  padding: '1rem',
})
