import { Page } from '@playwright/test';

/*this base page will be used by lots of other pages,
  so we will put all the common methods here,
  like navigate to a page, click on an element,
  get text of an element, fill input fields etc. 
  This way we can reuse these methods in all our page object
  and avoid code duplication**/

/*export makes the basepage accessible outside of this file
 abstract means it cannot be instantiated directly, 
 it can only be extended by other classes**/
export abstract class BasePage {
  protected page: Page;

  //any subclass will get the parameter page from playwright from here
  constructor(page: Page) {
    this.page = page;
  }
  //method to navigate to a specific path, it takes a string parameter which is the URL path to navigate to
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }
  //method to click on an element, it takes a string parameter which is the locator of the element to click on
  async clickOnElement(locator: string): Promise<void> {
    await this.page.click(locator);
  }
 //method to get the text of an element, it takes a string parameter which is the locator of the element and returns a promise that resolves to the text content of the element
  async getElementText(locator: string): Promise<string> {
    return (await this.page.textContent(locator)) || '';
  }
  //method to fill an input field, it takes two string parameters, the first one is the locator of the input field and the second one is the value to fill in the input field
  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }
}
