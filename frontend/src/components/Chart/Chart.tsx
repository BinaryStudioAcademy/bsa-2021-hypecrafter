import ChartComponent from 'react-chartjs-2';
import React from 'react';

interface DataItem {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

type ChartType =
  | 'line'
  | 'bar'
  | 'horizontalBar'
  | 'radar'
  | 'doughnut'
  | 'polarArea'
  | 'bubble'
  | 'pie'
  | 'scatter';

interface ChartProps {
  type?: ChartType;
  labels?: string[];
  datasets?: DataItem;
}

const Chart: React.FC<ChartProps> = ({ type, datasets, labels }) => (
  <ChartComponent type={type} data={{ labels, datasets: [datasets] }} />
);

export default Chart;
