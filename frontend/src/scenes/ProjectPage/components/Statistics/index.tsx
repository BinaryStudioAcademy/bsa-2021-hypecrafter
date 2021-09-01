import { TimeInterval } from 'hypecrafter-shared/enums';
import { FC, useEffect, useState } from 'react';
import Chart from '../../../../components/Chart';
import { useAction, useTypedSelector } from '../../../../hooks';
import classes from '../../styles.module.scss';
import getStatisticsOption from './options';
import TimeButton from './TimeButton/TimeButton';

interface StatisticsProps {
  t: CallableFunction;
  projectId: string;
}

const Statistics: FC<StatisticsProps> = ({ t, projectId }) => {
  const { statistics } = useTypedSelector(({ projectPage }) => ({
    statistics: projectPage.statistics
  }));

  const { fetchStatistics } = useAction();

  const [params, setParams] = useState(getStatisticsOption([], t));

  const handleOnClick = (timeInterval: TimeInterval) => {
    console.log('TIME', timeInterval);
    fetchStatistics({ id: projectId, timeInterval });
  };

  useEffect(() => {
    setParams(getStatisticsOption(statistics.donations, t));
  }, [statistics]);

  return (
    <div className={classes['statistics-wrapper']}>
      <div className={classes['statistics-button-wrapper']}>
        {Object.values(TimeInterval).map((el, i) => (
          <TimeButton
            key={el}
            timeInterval={el}
            onHandleClick={handleOnClick}
            isSelected={i === 3}
          />
        ))}
      </div>
      <div className={classes['statistics-chart-wrapper']}>
        <Chart
          type={params.type}
          labels={params.labels}
          dataSets={params.dataSets}
          options={params.options}
          height="300px"
        />
      </div>
    </div>
  );
};

export default Statistics;
