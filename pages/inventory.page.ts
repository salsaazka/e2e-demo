import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export type SortOption = 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

  private item(name: string) {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async addProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProduct(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async addProducts(names: readonly string[]) {
    for (const name of names) await this.addProduct(name);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption({ label: option });
  }

  async getNames() {
    return this.itemNames.allTextContents();
  }

  async getPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((text) => Number(text.replace('$', '')));
  }
}
