/* eslint-disable */
import { TimeInterval } from 'hypecrafter-shared/enums';
import { FC, useEffect, useState } from 'react';
import Chart from '../../../../components/Chart';
import { useAction, useTypedSelector } from '../../../../hooks';
import classes from '../../styles.module.scss';
import getStatisticsOption from './options';

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

  const handleOnClick = () => {
    fetchStatistics({ id: projectId, timeInterval: TimeInterval.AllTime });
  }

  useEffect(() => {
    setParams(getStatisticsOption(statistics.donations, t));
  }, [statistics]);

  return (
    <div className={classes['statistics-wrapper']}>
      <Chart
        type={params.type}
        labels={params.labels}
        dataSets={params.dataSets}
        options={params.options}
        height="230px"
      />
      <button onClick={handleOnClick}>day</button>
    </div>
  );
};

export default Statistics;
