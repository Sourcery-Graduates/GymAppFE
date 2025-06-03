import Button from '@/app/components/buttons/Button/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './MyTrainingCalendar.scss';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { currentMonthCalendarDates, firstDayOfCurrentMonth, weekDaysShortNames } from '@/app/util/date';
import { getUserWorkoutGridByDateRange } from '@/api/workout';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarWorkoutHashMap, ResponseWorkout } from '@/types/entities/Workout';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/routes';
import { Tooltip } from '@mui/material';

const MyTrainingCalendar = () => {
  const navigate = useNavigate();
  const [firstDayOfCurrentMonthDate, setFirstDayOfCurrentMonthDate] = useState<Dayjs>(firstDayOfCurrentMonth());
  const [workouts, setWorkouts] = useState<CalendarWorkoutHashMap>({});

  const handleAddMonth = (monthOffset: number) => {
    setFirstDayOfCurrentMonthDate((firstDayOfCurrentMonthDate) => {
      let newDate = dayjs(firstDayOfCurrentMonthDate);
      newDate = newDate.add(monthOffset, 'months');
      return newDate;
    });
  };

  const calculateNumberOfWorkouts = (date: dayjs.Dayjs) => {
    const workoutsArray: ResponseWorkout[] = workouts[`${date.format('YYYY-MM-DD')}`];
    if (workoutsArray !== undefined) {
      return workoutsArray.length;
    }
    return 0;
  };

  const handleCurrentMonth = () => {
    if (!firstDayOfCurrentMonthDate.isSame(firstDayOfCurrentMonth())) {
      setFirstDayOfCurrentMonthDate(firstDayOfCurrentMonth());
    }
  };

  const calendarDays: Dayjs[] = useMemo(() => {
    return currentMonthCalendarDates(firstDayOfCurrentMonthDate);
  }, [firstDayOfCurrentMonthDate]);

  useEffect(() => {
    let lastDayOfTheMonthDate = dayjs(firstDayOfCurrentMonthDate);
    lastDayOfTheMonthDate = lastDayOfTheMonthDate.add(1, 'month');
    lastDayOfTheMonthDate = lastDayOfTheMonthDate.subtract(1, 'day');
    getUserWorkoutGridByDateRange(firstDayOfCurrentMonthDate, lastDayOfTheMonthDate)
      .then((data) => {
        setWorkouts(data);
      })
      .catch(() => {});
  }, [firstDayOfCurrentMonthDate]);

  const navigateToWorkout = (workoutId: string) => {
    navigate(AppRoutes.WORKOUT.replace(':workoutId', workoutId));
  };

  return (
    <>
      <div className='my-training-calendar-container'>
        <div className='my-training-calendar-navigation'>
          <div className='my-training-calendar-navigation-buttons'>
            <Button size='big' onClick={() => handleCurrentMonth()} dataTestId='current-month-button'>
              Current month
            </Button>
            <Button size='big' onClick={() => handleAddMonth(-1)}>
              <ArrowBackIosNewIcon className='calendar-nav-icon' />
            </Button>
            <Button size='big' onClick={() => handleAddMonth(1)}>
              <ArrowForwardIosIcon className='calendar-nav-icon' />
            </Button>
          </div>
          <div className='my-training-calendar-date'>
            <span>{firstDayOfCurrentMonthDate.format('MMMM')}</span>
            <span>{firstDayOfCurrentMonthDate.format('YYYY')}</span>
          </div>
        </div>
        <div className='my-training-calendar' data-testid='my-training-calendar'>
          {weekDaysShortNames.map((day, index) => (
            <div key={day} className={`item-header item-${index}`}>
              {day}
            </div>
          ))}
          {calendarDays.map((date, index) => (
            <div
              key={date.toISOString()}
              className={`item item-${index + 8} ${date.month() !== firstDayOfCurrentMonthDate.month() && 'not-displayed-month'}`}
            >
              <div className='date-header'>
                <span>{date.date()}</span>
                {calculateNumberOfWorkouts(date) > 2 && (
                  <span style={{ marginRight: '8px' }}>{`(${calculateNumberOfWorkouts(date)})`}</span>
                )}
              </div>
              {date.month() == firstDayOfCurrentMonthDate.month() && (
                <div className={'item-workout-container'} data-testid='item-workout-container'>
                  {workouts[`${date.format('YYYY-MM-DD')}`] &&
                    workouts[`${date.format('YYYY-MM-DD')}`].map((workout) => (
                      <Fragment key={workout.id}>
                        <Tooltip
                          disableInteractive
                          title={
                            <>
                              {workout.name} <br /> {workout.exercises.length}
                              {workout.exercises.length === 1 ? ' exercise' : ' exercises'}
                            </>
                          }
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, -8],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <div onClick={() => navigateToWorkout(workout.id)} className={'item-workout'}>
                            {workout.name}
                          </div>
                        </Tooltip>
                      </Fragment>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTrainingCalendar;
