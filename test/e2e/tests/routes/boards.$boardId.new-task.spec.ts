import { test, expect } from '../../utils/fixtures'

test('create new task', async ({ page, seedData }) => {
  const [board] = seedData.boards

  await page.goto(`/boards`)
  await page.getByRole('link', { name: board.name }).click()
  await page.getByRole('link', { name: /add new task/i }).click()

  await expect(page.getByRole('dialog', { name: /new task/i })).toBeVisible()

  await page.getByRole('textbox', { name: /title/i }).type('My new task')
  await page.getByRole('button', { name: /create task/i }).click()

  await expect(page.getByRole('dialog')).not.toBeVisible()

  await expect(page.getByText('My new task')).toBeVisible()
})

test('missing title', async ({ page, seedData }) => {
  const [board] = seedData.boards

  await page.goto(`/boards`)
  await page.getByRole('link', { name: board.name }).click()
  await page.getByRole('link', { name: /add new task/i }).click()

  await expect(page.getByRole('dialog', { name: /new task/i })).toBeVisible()

  await page.getByRole('button', { name: /create task/i }).click()

  await expect(
    page.getByText(/string must contain at least 3 character/i)
  ).toBeVisible()
})
