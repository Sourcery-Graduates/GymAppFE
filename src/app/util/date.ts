import dayjs, { Dayjs } from 'dayjs';

export const firstDayOfCurrentMonth = (): Dayjs => {
  let currentDate = dayjs().utc().startOf('day');
  currentDate = currentDate.subtract(currentDate.date() - 1, 'days');
  return currentDate;
};

export const currentMonthCalendarDates = (firstDayofCurrentMonthDate: Dayjs): Dayjs[] => {
  const calendarDays: Dayjs[] = [];
  const daysToSubtract = firstDayofCurrentMonthDate.day() === 0 ? 6 : firstDayofCurrentMonthDate.day() - 1;
  let newDate = dayjs(firstDayofCurrentMonthDate);
  newDate = newDate.subtract(daysToSubtract, 'days');

  for (let i = 0; i < 42; i++) {
    let date: Dayjs = dayjs(newDate);
    date = date.add(i, 'days');
    calendarDays.push(dayjs(date));
  }
  return calendarDays;
};

export const dateToUTCStartOfDay = (date: Dayjs | null): Dayjs | null => {
  if (date !== null) {
    return date.utc().startOf('day');
  } else {
    return date;
  }
};

export const weekDaysShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
