import { getUserWorkoutGrid } from '@/api/workout';
import './MyTraining.scss';
import { useQuery } from '@tanstack/react-query';
import Select from '@/app/components/select/Select';
import { useState } from 'react';
import MyTrainingList from '@/app/myTraining/myTrainingList/MyTrainingList';
import MyTrainingCalendar from '@/app/myTraining/myTrainingCalendar/MyTrainingCalendar';

const MyTraining = () => {
  const queryKey = 'user-workout-grid';
  const { data: workoutGrid } = useQuery({ queryKey: [queryKey], queryFn: getUserWorkoutGrid });

  const viewOptions = ['List', 'Calendar'];

  const [optionValue, setOptionValue] = useState<string>(viewOptions[0]);

  return (
    <div className='my-training'>
      <header className='my-training-header'>
        <div className='my-training-title'> MY TRAININGS</div>
        <Select
          className='my-training-select'
          values={viewOptions}
          optionValue={optionValue}
          setOptionValue={setOptionValue}
        />
      </header>
      <div className='workout-container'>
        {optionValue == viewOptions[0] && <MyTrainingList data={workoutGrid} />}
        {optionValue == viewOptions[1] && <MyTrainingCalendar />}
      </div>
    </div>
  );
};

export default MyTraining;
