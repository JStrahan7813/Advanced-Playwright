import { Page } from 'playwright';
import { ButtonElement } from './components/ButtonElement';
import { DropDownElement } from './components/DropDownElement';
//Using the date picker file to get the start and end dates for the booking process
import { selectBookingDates } from '../utils/date-picker';
export class BookingCar {
  page: Page;
  readonly startDatePicker: DropDownElement;
  readonly endDatePicker: DropDownElement;
  readonly bookNowButton: ButtonElement;
  readonly confirmBookingButton: ButtonElement;

  constructor(page: Page) {
    this.page = page;

    this.startDatePicker = new DropDownElement(page, '.react-datepicker__day');
    this.endDatePicker = new DropDownElement(page, '.react-datepicker__day');
    this.bookNowButton = new ButtonElement(page, '.book-now-button');
    this.confirmBookingButton = new ButtonElement(
      page,
      '.confirm-booking-button',
    );
  }

  async openBookingPage(): Promise<void> {
    await this.page.goto('/cars');
    await this.bookNowButton.click();
  }
  //method to select the booking dates using the date picker, it uses
  //  the selectBookingDates function to get the start and end dates
  //  and then selects them in the date picker
  async selectBookingDatesOnPage(): Promise<void> {
    const { startDateString, endDateString } = selectBookingDates();
    await this.startDatePicker.selectDate(startDateString);
    await this.endDatePicker.selectDate(endDateString);
  }

  async confirmBooking(): Promise<void> {
    await this.confirmBookingButton.click();
  }
}
