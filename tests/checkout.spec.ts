import { test, expect } from '../fixtures/pages.fixture';
import { PRODUCTS } from '../data/products';
import { invalidCustomers, validCustomer } from '../data/checkout';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addProducts([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await inventoryPage.openCart();
  });

  test('happy path: checkout 2 produk sampai selesai', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await cartPage.checkout();
    await checkoutInfoPage.submit(validCustomer);
    await expect(checkoutOverviewPage.itemPrices).toHaveCount(2);
    const total = await checkoutOverviewPage.getItemPricesSum();
    await expect(checkoutOverviewPage.subtotal).toHaveText(`Item total: $${total.toFixed(2)}`);
    await checkoutOverviewPage.finish();
    await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  for (const { name, customer, error } of invalidCustomers) {
    test(`validasi info: ${name}`, async ({ cartPage, checkoutInfoPage }) => {
      await cartPage.checkout();
      await checkoutInfoPage.submit(customer);
      await expect(checkoutInfoPage.errorMessage).toHaveText(error);
    });
  }

  test('cancel di halaman info kembali ke cart', async ({ page, cartPage, checkoutInfoPage }) => {
    await cartPage.checkout();
    await checkoutInfoPage.cancel();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.itemNames).toHaveCount(2);
  });
});
