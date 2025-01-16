import { PieChart } from '@mui/x-charts';
import './Charts.scss';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const Charts = () => {
  const [isLegendHidden, setIsLegendHidden] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsLegendHidden(true);
      } else {
        setIsLegendHidden(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='muscle-group-chart'>
      <h2 className='muscle-group-chart__title'>Muscle sets per week</h2>
      <Box className='muscle-group-chart__content'>
        <PieChart
          slotProps={{
            legend: { hidden: isLegendHidden },
          }}
          series={[
            {
              data: [
                { id: 1, value: 7, label: 'middleback' },
                { id: 2, value: 12, label: 'lats' },
                { id: 3, value: 18, label: 'abdominals' },
                { id: 4, value: 22, label: 'lowerback' },
                { id: 5, value: 16, label: 'forearms' },
                { id: 6, value: 30, label: 'abductors' },
                { id: 7, value: 27, label: 'traps' },
                { id: 8, value: 20, label: 'hamstrings' },
                { id: 9, value: 6, label: 'quadriceps' },
                { id: 10, value: 23, label: 'chest' },
                { id: 11, value: 22, label: 'biceps' },
              ],
              innerRadius: 15,
              paddingAngle: 3,
              cornerRadius: 3,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: '#181818' },
            },
          ]}
        />
      </Box>
    </div>
  );
};

export default Charts;
