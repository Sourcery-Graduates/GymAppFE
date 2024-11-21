import Button from '@/app/components/buttons/Button/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './MyTrainingCalendar.scss';
import { useMemo, useState } from 'react';
import { currentMonthCalendarDates, firstDayOfCurrentMonth, weekDaysShortNames } from '@/app/util/date';

const MyTrainingCalendar = () => {
  const [firstDayOfCurrentMonthDate, setFirstDayOfCurrentMonthDate] = useState<Date>(firstDayOfCurrentMonth());

  const handleAddMonth = (monthOffset: number) => {
    setFirstDayOfCurrentMonthDate((firstDayOfCurrentMonthDate) => {
      const newDate = new Date(firstDayOfCurrentMonthDate);
      newDate.setMonth(newDate.getMonth() + monthOffset);
      return newDate;
    });
  };

  const calendarDays: Date[] = useMemo(() => {
    return currentMonthCalendarDates(firstDayOfCurrentMonthDate);
  }, [firstDayOfCurrentMonthDate]);

  return (
    <div className='my-training-calendar-container'>
      <div className='my-training-calendar-navigation'>
        <Button onClick={() => handleAddMonth(-1)}>
          <ArrowBackIosIcon />
        </Button>
        <Button onClick={() => handleAddMonth(1)}>
          <ArrowForwardIosIcon />
        </Button>
        <div className='my-training-calendar-date'>
          <div>{firstDayOfCurrentMonthDate.toLocaleString('en-US', { month: 'long' })}</div>
          <div>{firstDayOfCurrentMonthDate.toLocaleString('en-US', { year: 'numeric' })}</div>
        </div>
      </div>
      <div className='my-training-calendar'>
        {weekDaysShortNames.map((day, index) => (
          <div key={day} className={`item-header item-${index}`}>
            {day}
          </div>
        ))}
        {calendarDays.map((date, index) => (
          <div
            className={`item item-${index + 8} ${date.getMonth() !== firstDayOfCurrentMonthDate.getMonth() && 'not-displayed-month'}`}
          >
            <span>{date.getDate()}</span>
            {date.getMonth() == firstDayOfCurrentMonthDate.getMonth() && (
              <div className={'item-workout-container'}>
                <div title={'workout sdafdsafdsafsadffffffffffffffffffffffffffffffffff'} className={'item-workout'}>
                  workout sdafdsafdsafsadffffffffffffffffffffffffffffffffff
                </div>
                <div title={'workout'} className={'item-workout'}>
                  workout sdafdsafdsafsadffffffffffffffffffffffffffffffffff
                </div>
                <div title={'workout'} className={'item-workout'}>
                  workout
                </div>
                <div title={'workout'} className={'item-workout'}>
                  workout
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrainingCalendar;
