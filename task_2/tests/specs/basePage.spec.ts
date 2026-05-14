import { test } from '@playwright/test';
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import { BasePage } from "../pages/BasePage";

chromium.use(stealth());

test("найти и вывести первые 10 штук транспортиров", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);

  await basePage.open();
  await basePage.closePopupWindow();
  await basePage.closeCookiesAlert();
  await basePage.enterProductName("транспортир");
  await basePage.pressEnterKey();
  await basePage.chooseSortByIncreasingPrice();
  await basePage.checkPageContent();
});
