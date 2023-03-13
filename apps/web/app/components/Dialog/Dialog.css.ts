import { style } from '@vanilla-extract/css'

export const overlay = style({
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

export const content = style({
  backgroundColor: 'white',
  padding: '1rem',
})
