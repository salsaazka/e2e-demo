import { test, expect } from '../fixtures/pages.fixture';
import { invalidLogins, validUser } from '../data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('login sukses dengan standard_user', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  for (const { name, username, password, error } of invalidLogins) {
    test(`login gagal: ${name}`, async ({ loginPage }) => {
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toHaveText(error);
    });
  }
});
