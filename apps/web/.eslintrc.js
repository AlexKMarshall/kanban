require('@kanban/eslint-config-bases/patch/modern-module-resolution')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  ignorePatterns: [
    '**/node_modules',
    'build',
    'public/build',
    'storybook-static',
    'playwright-report',
  ],
  extends: [
    '@kanban/eslint-config-bases/regex',
    '@kanban/eslint-config-bases/rtl',
    '@kanban/eslint-config-bases/sonar',
    '@kanban/eslint-config-bases/storybook',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@kanban/eslint-config-bases/prettier',
  ],
}
