import { test, expect } from "@playwright/test";

// Test suite sprawdzający podstawowe operacje na stronie
test.describe("Basic operation of the website", () => {
  // Hook wykonujący się przed każdym testem - otwiera stronę główną
  test.beforeEach(async ({ page }) => {
    const url = "https://our3worlds.pl/";
    await page.goto(url);
  });

  // Funkcja pomocnicza do klikania w element i sprawdzania jego widoczności
  async function clickAndExpectVisible(locator) {
    await expect(locator).toBeVisible(); // Asercja sprawdzająca widoczność elementu
    await locator.click();
  }

  // Test sprawdzający funkcjonalność przycisków w sekcji Rzym
  test("Rome - buttons check", async ({ page }) => {
    await page.locator("#side2").click();

    // Sprawdzenie przycisku wyboru imperium
    const wybieramButton = page.getByRole("button", {
      name: "WYBIERAM IMPERIUM W PŁ",
    });
    await clickAndExpectVisible(wybieramButton);

    // Asercja sprawdzająca czy URL zawiera "rome"
    await expect(page).toHaveURL(/.*rome/);

    // Sprawdzenie przycisku rozpoczęcia
    const zaczynijuzdzisButton = page.getByRole("button", {
      name: "ZACZNIJ JUŻ DZIŚ",
    });
    await clickAndExpectVisible(zaczynijuzdzisButton)
  });

  // Test sprawdzający link do forum Kroniki Arborgu
  test("Test Link to forum Kroniki Arborgu", async ({ page }) => {
    await page.locator("#side1").click();
    const buttonArborg = page.getByRole("button", {
      name: "WYBIERAM KRONIKI ARBORGU",
    });
    await clickAndExpectVisible(buttonArborg);

    await page
      .getByRole("link", { name: "Królestwo rządzone przez Kró" })
      .click();

    // Asercja sprawdzająca widoczność wiersza z Królestwem Dorwin
    const dorwinRow = page.getByRole("row", {
      name: "Królestwo Dorwin",
      exact: true,
    });
    await expect(dorwinRow).toBeVisible();
  });

  // Test sprawdzający link do forum Imperium w Płomieniach
  test("Test Link to forum Imperium w Płomieniach", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();
    await page.getByRole("link", { name: "Odległość do Antiochii od" }).click();

    // Asercja sprawdzająca widoczność komórki z tekstem "Spotkanie (cz. I)"
    const cellElement = page.getByRole("cell", { name: "Spotkanie (cz. I)" });
    await expect(cellElement).toBeVisible();
  });

  // Test sprawdzający funkcjonalność mapy
  test("Rome - map test", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();

    // Asercja sprawdzająca widoczność obrazka mapy
    const mapImage = page.getByRole("img", { name: "Obrazek" });
    await expect(mapImage).toBeVisible();
    await mapImage.click();

    // Asercja sprawdzająca widoczność obszaru mapy
    const mapArea = page
      .locator("div")
      .filter({ hasText: "+− Leaflet | The map is" })
      .nth(3);
    await expect(mapArea).toBeVisible();

    // Test funkcjonalności przybliżania i oddalania
    await page.getByLabel("Zoom out").click();
    await page.getByLabel("Zoom in").click();

    // Asercja sprawdzająca czy mapa nadal jest widoczna po operacjach zoom
    await expect(mapArea).toBeVisible();
  });

  // Test sprawdzający funkcjonalność slidera
  test("Rome - slider test", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();

    // Asercje sprawdzające widoczność przycisków nawigacji slidera
    const nextButton = page.locator(".swiper-button-next");
    const prevButton = page.locator(".swiper-button-prev");
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();

    // Test nawigacji w przód
    await nextButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible();

    await nextButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible();

    // Test nawigacji w tył
    await prevButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible();

    // Test wielokrotnego klikania w przycisk wstecz
    await prevButton.click({ clickCount: 3 });
    await prevButton.dblclick();
    await expect(prevButton).toBeVisible();
  });
});
