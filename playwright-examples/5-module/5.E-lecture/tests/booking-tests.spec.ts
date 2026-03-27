import { expect } from '@playwright/test';
//imports the car dataset which contains the different car models and
//  their prices,
//  this allows us to run the same booking test for each car model in
//  the dataset,
//  ensuring that our booking functionality works correctly for all
// available cars.
import { carData } from '../data/carData';
import { test } from '../fixtures/global';

//  { model: 'Sedan', price: 100, carType: 'Economy' },
//   { model: 'SUV', price: 150, carType: 'Luxury' },
//   { model: 'Convertible', price: 200, carType: 'Premium' },
//   { model: 'Truck', price: 180, carType: 'Heavy Duty' },

//key technique used in data-driven testing, where we run the same
//  test logic with different sets of data to ensure that our
// application behaves correctly under various conditions and with
//  different inputs.
test.describe('Car Booking Tests', () => {
  for (const { model, price } of carData) {
    test(`should book a ${model} model with price $${price}`, async ({
      bookingCarPage,
    }) => {
      await bookingCarPage.openBookingPage();
      await bookingCarPage.selectBookingDatesOnPage();
      await bookingCarPage.confirmBooking();
      const confirmationText = await bookingCarPage.page.textContent(
        '.booking-confirmation',
      );
      expect(confirmationText).toContain(model);
      expect(confirmationText).toContain(price);
    });
  }
});
