import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';
  readonly itemPrices: Locator;
  readonly subtotal: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.subtotal = page.getByTestId('subtotal-label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  async getItemPricesSum() {
    const texts = await this.itemPrices.allTextContents();
    return texts.reduce((sum, text) => sum + Number(text.replace('$', '')), 0);
  }

  async finish() {
    await this.finishButton.click();
  }
}
