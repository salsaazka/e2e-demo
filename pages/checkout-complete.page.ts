import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';
  readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByTestId('complete-header');
  }
}
