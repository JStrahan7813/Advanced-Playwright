import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

//*This page object represents the "Our Cars" page of the application.
// It extends the BasePage class, which means it inherits all the common methods defined in the BasePage, such as navigateTo, clickOnElement, getElementText, and fillInput. 
// This allows us to reuse those methods in this page object and avoid code duplication. 
// The OurCarsPage class contains specific methods related to the "Our Cars" page, such as navigating to the page, getting car buttons, getting car details text, getting car price text, and checking if a car button is visible. 
// These methods use the inherited methods from the BasePage to interact with the elements on the "Our Cars" page.
export class OurCarsPage extends BasePage {
  async navigateToOurCarsPage(): Promise<void> {
    //https://course-user:Cou1dc4F@test.elitefleetgroup.engenious.io/
    await this.navigateTo('/our-cars');
  }
  //method to get the locator of a car button based on the car name, it takes a string parameter which is the name of the car and returns a promise that resolves to a Locator object representing the button element for that car
  //promise is used here because the method is asynchronous and it needs to wait for the locator to be available before returning it
  async getCarButton(carName: string): Promise<Locator> {
    return this.page.locator(`button:has-text("${carName}")`);
  }
 //method to get the locator of the car details text based on the car name, it takes a string parameter which is the name of the car and returns a Locator object representing the text element for that car
  getCarDetailsText(carName: string): Locator {
    
    return this.page.getByText(carName);
  }
//method to get the locator of the car price text based on the car name and price, it takes two string parameters, the first one is the name of the car and the second one is the price of the car, and returns a Locator object representing the text element that contains both the car name and price
  getCarPriceText(carName: string, price: string): Locator {
    return this.page.getByText(`${carName}${price}Book Now`);
  }
//method to get the locator of the "Book Now" button for a specific car, it takes a string parameter which is the name of the car and returns a Locator object representing the "Book Now" button element for that car
  getBookNowButton(): Locator {
    return this.page.getByText('Book Now').nth(2);
  }
//method to check if a car button is visible on the page, it takes a string parameter which is the name of the car and returns a promise that resolves to a boolean value indicating whether the button for that car is visible or not
  async isCarButtonVisible(carName: string, timeout=5000): Promise<boolean> {
    try {
    // wait for button to appear and be visible
    await this.page.waitForSelector(`button:has-text("${carName}")`, { state: 'visible', timeout });
    return true;
  } catch {
    return false; // timed out, button not visible
  }
  //  return (await this.getCarButton(carName)).isVisible();
  }
}
