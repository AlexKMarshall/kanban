import { test, expect } from '../../utils/fixtures'

test('display board', async ({ page, seedData }) => {
  const [board] = seedData.boards

  await page.goto('/boards/')

  await page.getByRole('link', { name: board.name }).click()

  await expect(page.getByRole('heading', { name: board.name })).toBeVisible()
})
