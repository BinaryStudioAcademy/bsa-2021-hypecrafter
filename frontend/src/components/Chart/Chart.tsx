import ChartComponent from 'react-chartjs-2';
import React from 'react';

const testData = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 1)'
    }
  ]
};

type TDataSet = [
  {
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
  }
];

type TChartType =
  | 'line'
  | 'bar'
  | 'horizontalBar'
  | 'radar'
  | 'doughnut'
  | 'polarArea'
  | 'bubble'
  | 'pie'
  | 'scatter';

type IChartProps = {
  type?: TChartType;
  data?: TDataSet | any;
};

const ChartExample: React.FC<IChartProps> = ({ type, data }) => {
  console.log('hello');
  return (
    <>
      <ChartComponent type={type || 'line'} data={data || testData} />
    </>
  );
};

export default ChartExample;
