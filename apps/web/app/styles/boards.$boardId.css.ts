import { style } from '@vanilla-extract/css'

export const columnWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  overflow: 'scroll',
})

export const columnName = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  lineHeight: 1.25,
  textTransform: 'uppercase',
})

export const cardTitle = style({
  fontSize: '0.9375rem',
  fontWeight: 700,
})
