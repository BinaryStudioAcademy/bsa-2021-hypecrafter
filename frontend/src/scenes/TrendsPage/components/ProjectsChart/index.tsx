import { ChartOptions } from 'chart.js';
import { FC, useState } from 'react';
import Chart, { ChartType, DataItem } from '../../../../components/Chart';
import { Category } from '../../interfaces';
import CategorySubtitle from './CategorySubtitle';
import classes from './style.module.scss';

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
            height="400px"
            width="300px"
          />
        </div>
      </div>
    </section>
  );
};

export default PopularProjectsChart;
