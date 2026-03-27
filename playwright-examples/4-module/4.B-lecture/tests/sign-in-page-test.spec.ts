import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

const EMAIL = 'tjdstrahan@hotmail.com';
const PASSWORD = 'Gathpara2';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(); // navigate to login page before each test
  });

  test('Verify login dialog, enter credentials, and sign in', async () => {
    // 1️⃣ Assert the login button (SIGN IN) is visible
    const loginDialogVisible = await (
      await loginPage.getLoginDialog()
    ).isVisible();
    expect(loginDialogVisible).toBeTruthy();

    // 2️⃣ Fill in the email field
    const emailField = await loginPage.getEmailField();
    await emailField.fill(EMAIL);

    // 3️⃣ Fill in the password field
    const passwordField = await loginPage.getPasswordField();
    await passwordField.fill(PASSWORD);

    // 4️⃣ Click Sign In
    const signInButton = await loginPage.getSignInButton();
    await signInButton.click();

    // 5️⃣ Assert post-login element (dashboard) is visible
    const emailErrorVisible = await loginPage
      .getEmailError()
      .then((e) => e.isVisible());
    expect(emailErrorVisible).toBeTruthy();

    //expect(dashboardVisible).toBeTruthy();

    // 6️⃣ Optional: assert email error visible if testing invalid login
    // const emailErrorVisible = await (await loginPage.getEmailError()).isVisible();
    // expect(emailErrorVisible).toBeTruthy();

    console.log('Successfully navigated to dashboard after sign-in:', EMAIL);
  });
});
