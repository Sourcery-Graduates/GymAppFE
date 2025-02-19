import { PieChart } from '@mui/x-charts';
import './Charts.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MuscleSet } from '@/types/entities/Workout';
import { getTotalMuscleSetsPerWeek } from '@/api/workoutStats';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/pages/errorPage/ErrorPage';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Charts = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [offsetWeek, setOffsetWeek] = useState<number>(0);

  const {
    data: muscleSets,
    error: errorQuery,
    isLoading,
  } = useQuery<MuscleSet[]>({
    queryKey: ['muscle-sets', offsetWeek],
    queryFn: () => {
      return getTotalMuscleSetsPerWeek(offsetWeek);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <BasicSpinner />;
  }
  if (errorQuery) {
    return <ErrorPage />;
  }

  const handleOffsetWeekChange = (event) => {
    setOffsetWeek(event.target.value);
  };

  const chartData =
    muscleSets
      ?.map((muscleSet) => {
        if (muscleSet.primaryMuscles && muscleSet.primaryMuscles[0] && muscleSet.numberOfSets != null) {
          return {
            id: muscleSet.primaryMuscles[0],
            value: muscleSet.numberOfSets,
            label: muscleSet.primaryMuscles[0],
          };
        }
        return null;
      })
      .filter((item) => item !== null) || [];

  return (
    <div className='muscle-group-chart'>
      <h2 className='muscle-group-chart__title'>Muscle sets per week</h2>
      <div className='muscle-group-chart__content'>
        <div className='muscle-group-chart__content--select'>
          <FormControl fullWidth color='secondary'>
            <InputLabel id='muscle-group-week-select'>Week</InputLabel>
            <Select
              labelId='muscle-group-week-select-label'
              id='muscle-group-week-select'
              value={offsetWeek}
              label='Age'
              onChange={handleOffsetWeekChange}
            >
              <MenuItem value={0}>Current</MenuItem>
              <MenuItem value={1}>Previous</MenuItem>
              <MenuItem value={2}>2 weeks ago</MenuItem>
              <MenuItem value={3}>3 weeks ago</MenuItem>
              <MenuItem value={4}>Month ago</MenuItem>
            </Select>
          </FormControl>
        </div>
        {chartData.length > 0 ? (
          <PieChart
            slotProps={{
              legend: { hidden: isMobile },
            }}
            series={[
              {
                data: chartData,
                innerRadius: 15,
                paddingAngle: 3,
                cornerRadius: 3,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: '#181818' },
              },
            ]}
          />
        ) : (
          <p className='muscle-group-chart__content--no-data'>No muscle groups have been trained</p>
        )}
      </div>
    </div>
  );
};

export default Charts;
