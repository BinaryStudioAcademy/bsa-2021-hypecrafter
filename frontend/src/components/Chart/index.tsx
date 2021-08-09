import ChartComponent from 'react-chartjs-2';
import { ChartOptions, Chart as Chartjs } from 'chart.js';
import React from 'react';
import defaultProps from './utils';

export interface DataItem {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string | ((context: {chart: Chartjs}) => CanvasGradient| null);
  borderColor?: string | ((context: {chart: Chartjs}) => CanvasGradient| null);
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

const Chart: React.FC<ChartProps> = ({ type, dataSets, labels, options }) => (
  <ChartComponent
    type={type}
    data={{
      labels,
      datasets: dataSets
    }}
    options={options || defaultProps.options}
  />
);

export default Chart;
