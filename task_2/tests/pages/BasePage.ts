import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  private readonly searchField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = this.page.getByTestId("searchInput");
  }

  async open() {
    await this.page.goto("https://www.wildberries.ru");
  }

  async closePopupWindow() {
    const popUpWindow = this.page.getByRole("button", {
      name: "close",
    });

    await popUpWindow.click();
  }

  async closeCookiesAlert() {
    const cookieAlert = this.page.getByRole("button", {
      name: "Окей",
    });

    await cookieAlert.click();
  }

  async enterProductName(productName: string) {
    await this.searchField.fill(productName);
  }

  async pressEnterKey() {
    await this.page.keyboard.press("Enter");
    await this.page.locator(".product-card__wrapper").first().waitFor({ state: "visible", timeout: 15000 });
  }

  async chooseSortByIncreasingPrice() {
    const sortElement = this.page.getByRole('button', { name: 'По популярности' });
    const option = this.page.getByText("По возрастанию цены");

    await sortElement.first().waitFor({ state: 'attached' });
    await this.page.waitForTimeout(500); // небольшая пауза
    await sortElement.first().click({ force: true });
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();

    // Ждём обновления результатов после сортировки
    await this.page.locator(".product-card__wrapper").first().waitFor({ state: "visible", timeout: 15000 });
  }

  async checkPageContent() {
    await this.page
      .locator(".product-card__wrapper")
      .first()
      .waitFor({ state: "visible" });

    const products = await this.page
      .locator(".product-card__wrapper")
      .evaluateAll((elements) => {
        return elements.slice(0, 10).map((el) => ({
          brand: el.querySelector(".product-card__brand")?.textContent || "—",
          title: el.querySelector(".product-card__name")?.textContent || "—",
          price:
            el.querySelector(".price__lower-price.wallet-price.red-price")
              ?.textContent || "—",
        }));
      });

    products.forEach((product, i) => {
      console.log(
        `${i + 1}. ${product.brand} / ${product.title} — ${product.price}`,
      );
    });
  }
}
