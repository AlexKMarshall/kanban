import { style, styleVariants } from '@vanilla-extract/css'

const layoutBase = style({
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: 'max-content 1fr',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: `"logo header"
                      "main main"`,
  gap: '1rem',
})

export const layout = styleVariants({
  navOpen: [
    layoutBase,
    {
      '@media': {
        'screen and (min-width: 768px)': {
          gridTemplateAreas: `"logo header"
                            "sidebar main"`,
        },
      },
    },
  ],
  navClosed: [
    layoutBase,
    {
      '@media': {
        'screen and (min-width: 768px)': {
          gridTemplateAreas: `"logo header"
                            "main main"`,
        },
      },
    },
  ],
})

export const logo = style({
  gridArea: 'logo',
})

export const header = style({
  gridArea: 'header',
})

export const sidebar = style({
  display: 'none',
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
      gridArea: 'sidebar',
      selectors: {
        '[aria-expanded="false"] + &': {
          display: 'none',
        },
      },
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

export const showSidebarButton = style({
  position: 'fixed',
  bottom: '3rem',
  left: '1rem',
  selectors: {
    '&[aria-expanded="true"]': {
      display: 'none',
    },
  },
})
