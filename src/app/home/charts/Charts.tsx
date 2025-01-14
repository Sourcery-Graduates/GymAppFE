import { BarChart } from '@mui/x-charts';

const Charts = () => {
  return (
    <div className='muscle-group-chart'>
      <h2 className='muscle-group-chart__title'>Favourite muscles</h2>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={340}
        height={300}
      />
    </div>
  );
};

export default Charts;
