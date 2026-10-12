# CLAUDE.md

## Project
E2E testing untuk https://www.saucedemo.com memakai Playwright + TypeScript.

## Struktur
- `pages/` — Page Object Model, semua turunan dari `BasePage` (abstract)
- `fixtures/` — custom fixture untuk inject page object
- `data/` — test data (user, customer, kasus invalid)
- `tests/` — file spec dan setup

## Aturan
- Pakai Page Object Model dengan `BasePage` abstract
- Locator wajib `getByRole`, `getByLabel`, `getByPlaceholder`, atau `getByTestId`. Dilarang XPath dan CSS selector panjang
- Dilarang `waitForTimeout`, gunakan web-first assertion
- Assertion hanya di file spec, tidak di page object
- Jangan menulis komentar di dalam kode
- Fungsi kecil, patuhi SOLID, DRY, KISS
- Test independen satu sama lain
- Saucedemo memakai atribut `data-test`, jadi `testIdAttribute` di-set ke `data-test`

## Perintah
- `npx playwright test` — jalankan semua test
- `npx playwright test --ui` — mode UI
- `npx playwright test --repeat-each=3` — deteksi flaky
