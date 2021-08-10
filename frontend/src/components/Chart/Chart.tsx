import ChartComponent from 'react-chartjs-2';
import { ChartOptions, Chart as Chartjs } from 'chart.js';
import React from 'react';
import defaultProps from './testprops';
import classes from './style.module.scss';

export interface DataItem {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string;
  borderColor?:
    | string
    | ((context: { chart: Chartjs }) => CanvasGradient | null);
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

const Chart: React.FC<ChartProps> = ({
  type,
  dataSets,
  labels: propLabels,
  options
}) => (
  <div className={classes.chart}>
    <ChartComponent
      type={type}
      data={{
        labels: propLabels,
        datasets: dataSets
      }}
      options={options || defaultProps.options}
    />
  </div>
);

export default Chart;
