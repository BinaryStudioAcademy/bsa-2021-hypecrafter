import { FC } from 'react';
import { ChartOptions } from 'chart.js';
import classes from './style.module.scss';
import Chart, { DataItem, ChartType } from '../../../../components/Chart/Chart';

interface ChartProps {
  type: ChartType;
  labels: string[];
  dataSets: DataItem[];
  options?: ChartOptions;
}

interface PopularTagsChartProps {
  defaultParams: ChartProps;
}

const PopularTagsChart: FC<PopularTagsChartProps> = ({ defaultParams }) => (
  <div className={classes.item}>
    <div className={classes.topic}>Popular tags</div>
    <div className={classes['top-chart-wrapper']}>
      <Chart
        type={defaultParams.type}
        labels={defaultParams.labels}
        dataSets={defaultParams.dataSets}
        options={defaultParams.options}
      />
    </div>
  </div>
);

export default PopularTagsChart;
