import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ButtonElement } from './components/ButtonElement';
import { InputElement } from './components/InputElement';
import { TextElement } from './components/TextElement';

export class LoginPage extends BasePage {
  readonly emailInput: InputElement;
  readonly passwordInput: InputElement;
  readonly loginButton: ButtonElement;
  readonly errorMessage: TextElement;

  //this constructors intitialises dedicated page objects to store selectors
  //previously these were pit in test files but this is not scalable
  //as there are several buttons for example
  constructor(page: Page) {
    super(page);
    //note that email and password inputs are now using the 
    // InputElement class, which provides an enterText() 
    // method for easier interaction in tests - maintain/scaleable
    //these ui elements are now encapsulated in their own classes, which promotes
    // code reuse and separation of concerns, making the test codebase more maintainable as it grows 
    this.emailInput = new InputElement(page, '#email');
    this.passwordInput = new InputElement(page, '#password');
    this.loginButton = new ButtonElement(page, 'button[type="submit"]');
    this.errorMessage = new TextElement(page, '.error-message');
  }

  async login(email: string, password: string): Promise<void> {

    await this.emailInput.enterText(email);
    await this.passwordInput.enterText(password);
    await this.loginButton.click();
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async isUserProfileVisible(
    email: string,
    username: string,
  ): Promise<boolean> {
    const emailLocator = this.page.locator('.user-profile-email');
    const usernameLocator = this.page.locator('.user-profile-name');

    return (
      (await emailLocator.textContent()) === email &&
      (await usernameLocator.textContent()) === username
    );
  }
}
