import { PieChart } from '@mui/x-charts';
import './Charts.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MuscleSet } from '@/types/entities/Workout';
import { getTotalMuscleSetsPerWeek } from '@/api/workoutStats';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';
import ErrorPage from '@/app/errorPage/ErrorPage';

const Charts = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  const offsetWeek = 0;
  const {
    data: muscleSets,
    error: errorQuery,
    isLoading,
  } = useQuery<MuscleSet[]>({
    queryKey: ['muscle-sets'],
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

  if (!muscleSets || muscleSets.length == 0) {
    return null;
  }

  const chartData = muscleSets.map((muscleSet) => ({
    id: muscleSet.primaryMuscles[0],
    value: muscleSet.numberOfSets,
    label: muscleSet.primaryMuscles[0],
  }));

  return (
    <div className='muscle-group-chart'>
      <h2 className='muscle-group-chart__title'>Muscle sets per week</h2>
      <div className='muscle-group-chart__content'>
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
      </div>
    </div>
  );
};

export default Charts;
