import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
  }
}
