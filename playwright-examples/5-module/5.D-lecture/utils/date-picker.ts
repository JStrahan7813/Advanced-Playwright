//utility functions for date selection in the booking process,
//  these functions calculate the start and end dates for a booking, 
//  ensuring that the start date is always two days from the current date
//  and the end date is seven days from the current date. 
// The selectBookingDates function returns these dates in a string format suitable for input fields.


export const getStartDate = (): Date => {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  return today;
};

export const getEndDate = (): Date => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  return today;
};

export const selectBookingDates = (): {
  startDateString: string;
  endDateString: string;
} => {
  const startDate = getStartDate();
  const endDate = getEndDate();

  const startDateString = startDate.toISOString().split('T')[0]; // startDateString = '2022-01-01'
  const endDateString = endDate.toISOString().split('T')[0]; // endDateString = '2022-01-07'
  return {
    startDateString,
    endDateString,
  };
};
