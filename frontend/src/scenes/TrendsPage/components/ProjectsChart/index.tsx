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
}

const PopularProjectsChart: FC<PopularProjectsChartProps> = ({
  defaultParams,
  categories
}) => {
  const [selectedItem, setSelectedItem] = useState(categories[0]);

  const onCategoryClick = (item: Category) => {
    setSelectedItem(item);
  };

  return (
    <div className={classes.item}>
      <div className={classes.topic}>Popular projects</div>
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
        <div className={classes.text}>{selectedItem.name}</div>
        <div className={classes['bottom-chart-wrapper']}>
          <Chart
            type={defaultParams.type}
            labels={defaultParams.labels}
            dataSets={defaultParams.dataSets}
            options={defaultParams.options}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularProjectsChart;
