import { test, expect } from "@playwright/test";

test.describe("Basic operation of the website", () => {
  // Hook do przygotowania przed każdym testem
  test.beforeEach(async ({ page }) => {
    const url = "https://our2worlds.pl/";
    await page.goto(url);
  });

  // Funkcja do klikania w element i sprawdzania widoczności
  async function clickAndExpectVisible(locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  test("Rome - buttons check", async ({ page }) => {
    await page.locator("#side2").click();

    // Sprawdzenie przycisków
    const wybieramButton = page.getByRole("button", {
      name: "WYBIERAM IMPERIUM W PŁ",
    });
    await clickAndExpectVisible(wybieramButton);

    const zaczynijuzdzisButton = page.getByRole("button", {
      name: "ZACZNIJ JUŻ DZIŚ",
    });
    await clickAndExpectVisible(zaczynijuzdzisButton);

    // Sprawdzenie URL po kliknięciu (nie zaimplementowano na stronie)
    // await expect(page).toHaveURL(/.*przykładowyAdres/);
  });

  test("Test Link to forum Kroniki Arborgu", async ({ page }) => {
    await page.locator("#side1").click();
    const buttonArborg = page.getByRole("button", {
      name: "WYBIERAM KRONIKI ARBORGU",
    });
    await clickAndExpectVisible(buttonArborg);

    await page
      .getByRole("link", { name: "Królestwo rządzone przez Kró" })
      .click();

    // Sprawdzenie widoczności "Królestwo Dorwin"
    const dorwinRow = page.getByRole("row", {
      name: "Królestwo Dorwin",
      exact: true,
    });
    await expect(dorwinRow).toBeVisible();

    const strongElement = dorwinRow.getByRole("strong");
    await expect(strongElement).toBeVisible();
    await strongElement.click(); // Kliknięcie w strong na forum
  });

  test("Test Link to forum Imperium w Płomieniach", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();
    await page.getByRole("link", { name: "Odległość do Antiochii od" }).click();

    const cellElement = page.getByRole("cell", { name: "Spotkanie (cz. I)" });
    await expect(cellElement).toBeVisible(); // Sprawdzenie widoczności komórki

    const strongElement = cellElement.getByRole("strong");
    await expect(strongElement).toBeVisible();
    await strongElement.click(); // Kliknięcie w <strong>
  });

  test("Rome - map test", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();

    // Sprawdzenie, czy mapa się uruchamia.
    const mapImage = page.getByRole("img", { name: "Obrazek" });
    await expect(mapImage).toBeVisible(); // Asercja, czy mapa jest widoczna
    await mapImage.click();

    const mapArea = page
      .locator("div")
      .filter({ hasText: "+− Leaflet | The map is" })
      .nth(3);
    await expect(mapArea).toBeVisible(); // Asercja, czy mapa jest widoczna

    // Oddalanie i przybliżanie
    await page.getByLabel("Zoom out").click();
    await page.getByLabel("Zoom in").click();

    // Sprawdzenie, czy mapa nadal się wyświetla
    await expect(mapArea).toBeVisible();
  });

  test("Rome - slider test", async ({ page }) => {
    await page.locator("#side2").click();
    await page.getByRole("button", { name: "WYBIERAM IMPERIUM W PŁ" }).click();

    // Sprawdzenie przycisków slidera
    const nextButton = page.locator(".swiper-button-next");
    const prevButton = page.locator(".swiper-button-prev");
    await expect(nextButton).toBeVisible();
    await expect(prevButton).toBeVisible();

    // Kliknięcia w nextButton
    await nextButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible(); // Sprawdzenie, czy aktywny slajd się zmienia

    await nextButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible(); // Kolejny slajd

    // Kliknięcia w prevButton
    await prevButton.click();
    await expect(page.locator(".swiper-slide-active")).toBeVisible(); // Sprawdzenie poprzedniego slajdu

    // Klikanie w prevButton kilka razy
    await prevButton.click();
    await prevButton.click();
    await prevButton.click();
    await prevButton.dblclick();
    await expect(prevButton).toBeVisible(); // Sprawdzenie, czy przycisk prevButton nadal jest widoczny
  });
});
