import { expect, Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("#product-list > div");
    this.cartRows = page.locator("#cart-items > tr");
  }

  async goto() {
    await this.page.goto("http://127.0.0.1:5500/");
  }

  async addProduct(index: number, quantity = 1) {
    const addButton = this.productCards.nth(index).getByRole("button").first();

    for (let i = 0; i < quantity; i++) {
      await addButton.click();
    }
  }

  async viewCart() {
    await this.page.locator("#view-cart-btn").click();
  }

  async expectProductQuantity(rowIndex: number, quantity: string) {
    await expect(this.cartRows.nth(rowIndex).getByRole("cell").nth(2)).toHaveText(quantity);
  }

  async checkout() {
    await this.page.locator("#checkout-btn").click();
  }

  async fillCustomerDetails(name: string, email: string, address: string) {
    await this.page.locator("#name").fill(name);
    await this.page.locator("#email").fill(email);
    await this.page.locator("#address").fill(address);
  }

  async openPaymentInfo() {
    await this.page.locator('a[href="#paymentInfo"]').click();
  }

  async fillPaymentDetails(cardNumber: string, expiry: string, cvc: string) {
    await this.page.locator("#card-number").fill(cardNumber);
    await this.page.locator("#card-expiry").fill(expiry);
    await this.page.locator("#card-cvc").fill(cvc);
  }

  async pay() {
    await this.page.getByRole("button", { name: "Pagar" }).click();
  }

  async expectPurchaseSuccessful() {
    await expect(
      this.page.getByRole("heading", { name: "¡Tu compra fue exitosa!" }),
    ).toBeVisible();
  }
}
