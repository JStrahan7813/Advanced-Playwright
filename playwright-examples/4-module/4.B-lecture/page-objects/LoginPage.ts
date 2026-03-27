import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(
      'https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/',
    );

    // 2️⃣ Wait for any overlay or loader to disappear
    await this.page
      .locator('div._wrapper_1nqhl_1')
      .waitFor({ state: 'hidden', timeout: 10000 })
      .catch(() => {});

    const signInButtons = this.page.locator('button:has-text("Sign In")');
    const count = await signInButtons.count();
    console.log('Sign In buttons found:', count);

    // 3️⃣ Select the correct "Sign In" button (use nth() if multiple exist)
    const signInButton = this.page
      .getByRole('button', { name: 'Sign In' })
      .nth(1);

    // 4️⃣ Wait for it to be visible and enabled
    await signInButton.waitFor({ state: 'visible', timeout: 10000 });

    // 5️⃣ Scroll into view just in case
    await signInButton.scrollIntoViewIfNeeded();

    // 6️⃣ Click the button
    await signInButton.click();
  }
  async getEmailField(): Promise<Locator> {
    return this.page.locator('input[name="email"]'); // adjust selector to match your page
  }

  // Method to get the username input field
  async getPasswordField(): Promise<Locator> {
    return this.page.locator('input[name="password"]'); // adjust selector to match your page
  }

  // Method to get the Sign In button and assert we are signed in
  async getSignInButton(): Promise<Locator> {
    const signInButton = this.page.locator('button:has-text("SIGN IN")');
    return this.page.locator('button:has-text("SIGN IN")');

    // Example assertion: wait for a dashboard element to appear to confirm sign-in
    //const dashboardElement = this.page.locator('#dashboard'); // adjust selector
    //await dashboardElement.waitFor({ state: 'visible', timeout: 5000 });
  }

  async getEmailError(): Promise<Locator> {
    return this.page.locator(
      'span._error_1twi8_151:has-text("Email is required")',
    );
  }

  async getLoginDialog(): Promise<Locator> {
    //return this.page.locator('text=SIGN IN')
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  // Method to perform login
}
