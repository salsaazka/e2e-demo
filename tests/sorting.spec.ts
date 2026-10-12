import { test, expect } from '../fixtures/pages.fixture';
import { InventoryPage, SortOption } from '../pages/inventory.page';

type SortCase = {
  option: SortOption;
  sortedFrom: (page: InventoryPage) => Promise<{ actual: unknown[]; expected: unknown[] }>;
};

const byName = (direction: 1 | -1) => async (page: InventoryPage) => {
  const actual = await page.getNames();
  return { actual, expected: actual.toSorted((a, b) => direction * a.localeCompare(b)) };
};

const byPrice = (direction: 1 | -1) => async (page: InventoryPage) => {
  const actual = await page.getPrices();
  return { actual, expected: actual.toSorted((a, b) => direction * (a - b)) };
};

const sortCases: SortCase[] = [
  { option: 'Name (A to Z)', sortedFrom: byName(1) },
  { option: 'Name (Z to A)', sortedFrom: byName(-1) },
  { option: 'Price (low to high)', sortedFrom: byPrice(1) },
  { option: 'Price (high to low)', sortedFrom: byPrice(-1) },
];

test.describe('Sorting', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  for (const { option, sortedFrom } of sortCases) {
    test(`sort ${option}`, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(option);
      const { actual, expected } = await sortedFrom(inventoryPage);
      expect(actual).toEqual(expected);
    });
  }
});
