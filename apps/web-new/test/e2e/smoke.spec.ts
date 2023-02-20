import { test, expect } from '@playwright/test'

test('Smoke test', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(
    page.getByRole('heading', { name: /welcome to kanban/i })
  ).toBeVisible()

  await page.getByRole('link', { name: /boards/i }).click()

  await expect(page.getByRole('heading', { name: /boards/i })).toBeVisible()
})
