import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { OurCarsPage } from '../page-objects/OurCarsPage';
import { NavigationPage } from '../page-objects/NavigationPage';

//fixtures are special functions that allow us to set up and tear down
//  test environments, manage dependencies, and share common test data or state across multiple tests.
//here we have global fixtures but they canb run locally on specific tests
type Fixtures = {
  loginPage: LoginPage;
  ourCarsPage: OurCarsPage;
  navigationPage: NavigationPage;
};

//The BaseTest is extended with our custom fixtures, which means that
//  in any test file where we import this test object, 
// we can access the loginPage, ourCarsPage, and navigationPage 
// fixtures directly in our tests without having to set them up
//  individually in each test file. This promotes code 
// reuse and makes it easier to manage common setup logic 
// across multiple tests. It is also the API which launches the browser
//and creates a new page for each test, and then passes that page to
//  the fixture functions, 
// allowing them to create instances of the page objects with
//  the correct context for each test.
const test = baseTest.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  ourCarsPage: async ({ page }, use) => {
    const ourCarsPage = new OurCarsPage(page);
    await use(ourCarsPage);
  },
  navigationPage: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },
});

export { test };
