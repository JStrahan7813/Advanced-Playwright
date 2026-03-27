//A base class for all page objects, providing common methods for 
// interacting with the page and its elements. 
// It serves as a foundation for more specific page classes, 
// allowing them to inherit common functionality and maintain
//  a consistent structure across the test suite. 
// This promotes code reuse and makes it easier to manage and maintain
//  the test codebase as it grows.

import { Locator } from '@playwright/test';

export class BaseElement {
  protected locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  async getText(): Promise<string> {
    const text = await this.locator.textContent();
    return text ?? '';
  }

  async click(): Promise<void> {
    await this.locator.click();
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async getValue(): Promise<string> {
    return await this.locator.inputValue();
  }
}
