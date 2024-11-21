export const firstDayOfCurrentMonth = (): Date => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
};

export const currentMonthCalendarDates = (firstDayofCurrentMonthDate: Date): Date[] => {
  const calendarDays: Date[] = [];
  const daysToSubtract = firstDayofCurrentMonthDate.getDay() === 0 ? 6 : firstDayofCurrentMonthDate.getDay() - 1;
  const newDate = new Date(firstDayofCurrentMonthDate);
  newDate.setDate(firstDayofCurrentMonthDate.getDate() - daysToSubtract);

  for (let i = 0; i < 42; i++) {
    const date: Date = new Date(newDate);
    date.setDate(newDate.getDate() + i);
    calendarDays.push(date);
  }
  return calendarDays;
};

export const weekDaysShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
