import { test, expect } from '../fixtures/pages.fixture';
import { PRODUCTS } from '../data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('tambah 1 produk, badge menampilkan 1', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('tambah 2 produk, badge menampilkan 2', async ({ inventoryPage }) => {
    await inventoryPage.addProducts([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('hapus produk dari inventory, badge hilang', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(PRODUCTS.backpack);
    await inventoryPage.removeProduct(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('produk yang ditambah muncul di halaman cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProducts([PRODUCTS.backpack, PRODUCTS.bikeLight]);
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([PRODUCTS.backpack, PRODUCTS.bikeLight]);
  });

  test('hapus produk dari halaman cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProduct(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.removeProduct(PRODUCTS.backpack);
    await expect(cartPage.itemNames).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});
