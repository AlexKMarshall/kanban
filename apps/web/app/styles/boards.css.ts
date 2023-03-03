import { style } from '@vanilla-extract/css'

export const layout = style({
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `"logo header"
                      "nav main"`,
  gap: '1rem',
})

export const header = style({
  gridArea: 'header',
})

export const nav = style({
  gridArea: 'nav',
})

export const main = style({
  gridArea: 'main',
})

export const board = style({
  fontSize: '0.9375rem',
  fontWeight: 700,
})
