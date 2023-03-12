import { test, expect } from '../../utils/fixtures'

test('list of boards', async ({ page, seedData }) => {
  const { boards } = seedData

  await page.goto('/boards')

  for (const board of boards) {
    await expect(page.getByRole('link', { name: board.name })).toBeVisible()
  }
})
