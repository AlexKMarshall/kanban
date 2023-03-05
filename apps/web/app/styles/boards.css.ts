import { style } from '@vanilla-extract/css'

export const layout = style({
  display: 'grid',
  minHeight: '100vh',
  // gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `"header"
                      "main"`,
  gap: '1rem',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'auto 1fr',
      gridTemplateAreas: `"logo header"
                          "nav main"`,
    },
  },
})

export const header = style({
  gridArea: 'header',
})

export const nav = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
      gridArea: 'nav',
    },
  },
})

export const main = style({
  gridArea: 'main',
})

export const board = style({
  fontSize: '0.9375rem',
  fontWeight: 700,
})

export const boardName = style({
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: 1.25,
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
      fontSize: '1.25rem',
    },
    'screen and (min-width: 1024px)': {
      fontSize: '1.5rem',
    },
  },
})
