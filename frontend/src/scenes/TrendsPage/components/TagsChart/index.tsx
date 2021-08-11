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
  t: CallableFunction;
}

const PopularTagsChart: FC<PopularTagsChartProps> = ({ defaultParams, t }) => (
  <section className={classes.item}>
    <header className={classes.topic}>{t('Popular tags')}</header>
    <div className={classes['top-chart-wrapper']}>
      <Chart
        type={defaultParams.type}
        labels={defaultParams.labels}
        dataSets={defaultParams.dataSets}
        options={defaultParams.options}
      />
    </div>
  </section>
);

export default PopularTagsChart;
