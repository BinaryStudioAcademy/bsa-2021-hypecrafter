import { FC, useState } from 'react';
import { ChartOptions } from 'chart.js';
import classes from './style.module.scss';
import Chart, { DataItem, ChartType } from '../../../../components/Chart/Chart';
import { Category } from '../../interfaces';
import CategorySubtitle from './CategorySubtitle';

interface ChartProps {
  type: ChartType;
  labels: string[];
  dataSets: DataItem[];
  options?: ChartOptions;
}

interface PopularProjectsChartProps {
  defaultParams: ChartProps;
  categories: Category[];
  t: CallableFunction;
}

const PopularProjectsChart: FC<PopularProjectsChartProps> = ({
  defaultParams,
  categories,
  t
}) => {
  const [selectedItem, setSelectedItem] = useState(categories[0]);

  const onCategoryClick = (item: Category) => {
    setSelectedItem(item);
  };

  return (
    <section className={classes.item}>
      <header className={classes.topic}>{t('Popular projects')}</header>
      <div className={classes['subtopic-wrapper']}>
        {categories.map((el: Category) => (
          <CategorySubtitle
            key={el.id}
            isSelected={el.id === selectedItem.id}
            item={el}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
      <div className={classes['text-wrapper']}>
        <p className={classes.text}>{selectedItem.name}</p>
        <div className={classes['bottom-chart-wrapper']}>
          <Chart
            type={defaultParams.type}
            labels={defaultParams.labels}
            dataSets={defaultParams.dataSets}
            options={defaultParams.options}
          />
        </div>
      </div>
    </section>
  );
};

export default PopularProjectsChart;
