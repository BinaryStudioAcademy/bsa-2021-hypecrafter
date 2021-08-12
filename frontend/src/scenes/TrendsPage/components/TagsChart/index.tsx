import { ChartOptions } from 'chart.js';
import { FC } from 'react';
import Chart, { ChartType, DataItem } from '../../../../components/Chart';
import classes from './style.module.scss';

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
        height="230px"
      />
    </div>
  </section>
);

export default PopularTagsChart;
