import ChartComponent from 'react-chartjs-2';
import React from 'react';
import { defaultOptions } from './helpers';

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
  type?: ChartType;
  labels?: string[];
  dataSets?: DataItem[];
}

const Chart: React.FC<ChartProps> = ({ type, dataSets, labels }) => (
  <ChartComponent
    type={type}
    data={{ labels, datasets: dataSets }}
    options={defaultOptions}
  />
);

export default Chart;
