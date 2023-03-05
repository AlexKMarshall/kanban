import { style } from '@vanilla-extract/css'

export const columnWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.5rem',
  overflow: 'scroll',
})

export const column = style({
  width: '17.5rem',
  display: 'flex',
  flexDirection: 'column',
})

export const columnName = style({
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  lineHeight: 1.25,
  textTransform: 'uppercase',
})

export const cardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
})

export const card = style({
  paddingInline: '1rem',
  paddingBlock: '1.5rem',
  borderRadius: '0.5rem',
  boxShadow: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
})

export const cardTitle = style({
  fontSize: '0.9375rem',
  fontWeight: 700,
})
