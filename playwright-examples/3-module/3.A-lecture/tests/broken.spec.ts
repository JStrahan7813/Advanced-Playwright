import { test, expect } from '@playwright/test';

test('self-healing login test', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  
  // FAIL: This ID doesn't exist. The real ID is "submit"
  await page.locator('#old-broken-login-button-id').click(); 
  
  await expect(page).toHaveURL(/logged-in-successfully/);
});