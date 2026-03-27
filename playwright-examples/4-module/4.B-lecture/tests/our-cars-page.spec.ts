import { test, expect } from '@playwright/test';
import { OurCarsPage } from '../page-objects/OurCarsPage';

const BMW_M760 = 'BMW M760';
const carPrice = '$450/day';

test.describe('Our Cars Page', () => {
  //declare a variable ourCarsPage of type OurCarsPage, which will be used to create an instance of the OurCarsPage class and access its methods in the tests
  let ourCarsPage: OurCarsPage;
  //beforeEach is a hook that runs before each test in the describe block, it takes an asynchronous function as a parameter which receives the page object from Playwright, and inside this function we create a new instance of the OurCarsPage class using the page object and assign it to the ourCarsPage variable, then we call the navigateToOurCarsPage method to navigate to the "Our Cars" page before each test runs
  test.beforeEach(async ({ page }) => {
    ourCarsPage = new OurCarsPage(page);
    await ourCarsPage.navigateToOurCarsPage();
  });
  //test to verify that the "BMW M760" car button is visible on the "Our Cars" page, it uses the isCarButtonVisible method from the OurCarsPage class to check if the button for the "BMW M760" car is visible and expects it to be true
  test('Verify "BMW M760" is visible on the "Our Cars" page', async () => {
    //const stetup to denote that visibility denotes a boolean state
    //each const is declared within the relevaqnt test for clarity and maintainability but they could be refactored into a constants file also
    const isCarVisible = await ourCarsPage.isCarButtonVisible(BMW_M760);
    //then assert its truthfulness
    expect(isCarVisible).toBeTruthy();
  });
  //testto navigate cars page and verfiy several details assertions
  //are kept within the same method as it keeps things cleaner, more
  //reusable and away from the actual functionality of the cars page
  test('Navigate to and Verify the "BMW M760" Details Page', async () => {
    const isCarVisible = await ourCarsPage.isCarButtonVisible(BMW_M760);
    expect(await isCarVisible).toBeTruthy();
    expect(await ourCarsPage.getCarDetailsText(BMW_M760).isVisible()).toBeTruthy();
    expect(
      ourCarsPage.getCarPriceText(BMW_M760, carPrice).isVisible(),
    ).toBeTruthy();
    expect(await ourCarsPage.getBookNowButton().isVisible()).toBeTruthy();
    console.log(BMW_M760, carPrice);
  });
});
