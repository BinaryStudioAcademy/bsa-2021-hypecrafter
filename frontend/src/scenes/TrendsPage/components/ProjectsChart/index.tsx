import { FC, useEffect, useState } from 'react';
import { Category } from '../../../../common/types';
import Chart from '../../../../components/Chart';
import { useAction, useTypedSelector } from '../../../../hooks';
import { getProjectsOptions } from '../../options';
import CategorySubtitle from './CategorySubtitle';
import classes from './style.module.scss';

interface PopularProjectsChartProps {
  categories: Category[];
  t: CallableFunction;
}

const PopularProjectsChart: FC<PopularProjectsChartProps> = ({
  categories,
  t
}) => {
  const { fetchPopularProjectsByCategory, setSelectedCategoryAction } = useAction();

  const { projects, selectedCategory } = useTypedSelector(({ trendsPage }) => ({
    projects: trendsPage.projects,
    selectedCategory: trendsPage.selectedCategory
  }));

  const [defaultParams, setDefaultParams] = useState(
    getProjectsOptions(projects)
  );

  const onCategoryClick = (item: Category) => {
    setSelectedCategoryAction(item);
    fetchPopularProjectsByCategory(item.name);
  };

  useEffect(() => {
    setDefaultParams(getProjectsOptions(projects));
  }, [projects]);

  return (
    <section className={classes.item}>
      <header className={classes.topic}>{t('Popular projects')}</header>
      <div className={classes['subtopic-wrapper']}>
        {categories.map((el: Category) => (
          <CategorySubtitle
            key={el.id}
            isSelected={el.id === selectedCategory?.id}
            item={el}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
      <div className={classes['text-wrapper']}>
        <p className={classes.text}>
          {projects.length > 0
            ? selectedCategory?.name
            : t('No projects')}
        </p>
        <div className={classes['bottom-chart-wrapper']}>
          <Chart
            type={defaultParams.type}
            labels={defaultParams.labels}
            dataSets={defaultParams.dataSets}
            options={defaultParams.options}
            height="500px"
          />
        </div>
      </div>
    </section>
  );
};

export default PopularProjectsChart;
