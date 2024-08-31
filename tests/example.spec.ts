import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://our2worlds.pl/');
  await page.locator('#side1').click();
  await page.getByRole('button', { name: 'WYBIERAM KRONIKI ARBORGU' }).click();
  await page.getByRole('button', { name: 'ZACZNIJ JUŻ DZIŚ' }).click();
});
