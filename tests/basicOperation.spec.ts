import { test, expect } from '@playwright/test';

test.describe('Basic operation of the website', () => {

test('Rome - basic 1', async ({ page }) => {
  await page.goto('https://our2worlds.pl/');
  await page.locator('#side2').click();
  await page.getByRole('button', { name: 'WYBIERAM IMPERIUM W PŁ' }).click();
  await page.getByRole('button', { name: 'ZACZNIJ JUŻ DZIŚ' }).click();
});

test('Rome - map test', async ({ page }) => {
  await page.goto('https://our2worlds.pl/');
  await page.locator('#side2').click();
  await page.getByRole('button', { name: 'WYBIERAM IMPERIUM W PŁ' }).click();
  await page.getByRole('img', { name: 'Obrazek' }).click();
  await page.locator('div').filter({ hasText: '+− Leaflet | The map is' }).nth(3).click();
  await page.getByLabel('Zoom out').click();
  await page.getByLabel('Zoom in').click();
  await page.locator('div').filter({ hasText: '+− Leaflet | The map is' }).nth(3).click();
});

test('Rome - slider test', async ({ page }) => {
  await page.goto('https://our2worlds.pl/');
  await page.locator('#side2').click();
  await page.getByRole('button', { name: 'WYBIERAM IMPERIUM W PŁ' }).click();
  await page.locator('.swiper-button-next').click();
  await page.locator('.swiper-button-next').click();
  await page.locator('.swiper-button-prev').click();
  await page.locator('.swiper-button-prev').click();
  await page.locator('.swiper-button-prev').click();
  await page.locator('.swiper-button-prev').click();
  await page.locator('.swiper-button-prev').click();
  await page.locator('.swiper-button-prev').dblclick();
});











});