import { test, expect } from '../../utils/fixtures'

test('create a new board', async ({ page }) => {
  await page.goto('/boards')

  await page.getByRole('link', { name: /create new board/i }).click()

  await page.getByRole('textbox', { name: /board name/i }).type('My New Board')
  await page.getByRole('button', { name: /create new board/i }).click()

  await expect(page.getByRole('link', { name: /my new board/i })).toBeVisible()
})

test('missing name', async ({ page }) => {
  await page.goto('/boards')

  await page.getByRole('link', { name: /create new board/i }).click()

  await page.getByRole('button', { name: /create new board/i }).click()

  await expect(page.getByRole('alert')).toHaveText(
    /string must contain at least 3 character/i
  )
})

test('existing name', async ({ page, seedData }) => {
  const { boards } = seedData

  await page.goto('/boards')

  await page.getByRole('link', { name: /create new board/i }).click()

  await page.getByRole('textbox', { name: /board name/i }).type(boards[0].name)
  await page.getByRole('button', { name: /create new board/i }).click()

  await expect(page.getByRole('alert')).toHaveText(/board name already exists/i)
})
