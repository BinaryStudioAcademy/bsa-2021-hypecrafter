import ChartComponent from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import React from 'react';
import defaultProps from './testprops';

export interface DataItem {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string | ((context: any) => any);
}

export type ChartType =
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
  type: ChartType;
  labels: string[];
  dataSets: DataItem[];
  options?: ChartOptions;
}

const Chart: React.FC<ChartProps> = ({ type, dataSets, labels: propLabels, options }) => (
  <ChartComponent
    type={type}
    data={{
      labels: propLabels,
      datasets: dataSets
    }}
    options={options || defaultProps.options}
  />
);

export default Chart;
