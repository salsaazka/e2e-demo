import { test as setup } from '../fixtures/pages.fixture';
import { validUser } from '../data/users';


setup('authenticate as standard_user', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
