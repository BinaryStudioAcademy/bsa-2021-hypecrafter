import { FC } from 'react';
import Chart from '../../../../components/Chart';
import classes from '../../styles.module.scss';
import getStatisticsOption from './options';

interface StatisticsProps {
  t: CallableFunction;
}

const Statistics: FC<StatisticsProps> = ({ t }) => {
  const data = [
    {
      data: 30,
      date: 'fdsafsd'
    },
    {
      data: 14,
      date: 'fdsafsd'
    },
    {
      data: 45,
      date: 'fdsafsd'
    },
    {
      data: 19,
      date: 'fdsafsd'
    },
    {
      data: 27,
      date: 'fdsafsd'
    },
    {
      data: 40,
      date: 'fdsafsd'
    },
    {
      data: 30,
      date: 'fdsafsd'
    },
    {
      data: 14,
      date: 'fdsafsd'
    },
    {
      data: 45,
      date: 'fdsafsd'
    },
    {
      data: 19,
      date: 'fdsafsd'
    },
    {
      data: 27,
      date: 'fdsafsd'
    },
    {
      data: 40,
      date: 'fdsafsd'
    }
  ];

  const params = getStatisticsOption(data, t);

  return (
    <div className={classes['statistics-wrapper']}>
      <Chart
        type={params.type}
        labels={params.labels}
        dataSets={params.dataSets}
        options={params.options}
        height="230px"
      />
    </div>
  );
};

export default Statistics;
