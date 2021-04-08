const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getMonthName = (calendarMonth: string): any => {
  // calendarMonth can be any integer from 01 to 12
  const monthIndex = +calendarMonth - 1;

  return MONTHS[monthIndex];
}

export default getMonthName;
