import { style } from '@vanilla-extract/css'

export const dialogOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'hsl(0 0% 0% / 0.5)',
})

export const center = style({
  position: 'fixed',
  inset: 0,
  display: 'grid',
  placeContent: 'center',
})

export const dialogContent = style({
  backgroundColor: 'white',
  padding: '1rem',
})
