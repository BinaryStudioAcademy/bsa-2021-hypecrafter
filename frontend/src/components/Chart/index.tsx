import { Chart as Chartjs, ChartOptions, defaults } from 'chart.js';
import React from 'react';
import ChartComponent from 'react-chartjs-2';
import defaultProps from './utils';

export interface DataItem {
  label: string;
  data: number[];
  fill?: boolean;
  backgroundColor?: string | ((context: { chart: Chartjs }) => CanvasGradient | null);
  borderColor?: string | ((context: { chart: Chartjs }) => CanvasGradient | null);
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
  fontSize?: number;
  width?: string,
  height?: string
}

const Chart: React.FC<ChartProps> = ({
  type,
  dataSets,
  labels: propLabels,
  options,
  fontSize = 14,
  width = 'auto',
  height = 'auto'
}) => {
  defaults.font.size = fontSize;

  return (
    <div style={{ width, height }}>
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
};

export default Chart;
