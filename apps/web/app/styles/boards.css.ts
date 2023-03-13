import { style } from '@vanilla-extract/css'

export const layout = style({
  display: 'grid',
  minHeight: '100vh',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `"logo header"
                      "main main"`,
  gap: '1rem',
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'max-content 1fr',
      gridTemplateAreas: `"logo header"
                          "nav main"`,
    },
  },
})

export const logo = style({
  gridArea: 'logo',
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
  overflow: 'auto',
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

export const mobileNavTrigger = style({
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: 1.25,
  background: 'none',
  border: 'none',
  padding: 0,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
})
