import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import { TimeInterval } from 'hypecrafter-shared/enums';
import { FC, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from '../../../../components/Button';
import Chart from '../../../../components/Chart';
import { useAction, useTypedSelector } from '../../../../hooks';
import classes from '../../styles.module.scss';
import Card from './Card';
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

  const [selectedInterval, setSelectedInterval] = useState(
    TimeInterval.AllTime
  );

  const { fetchStatistics } = useAction();

  const [params, setParams] = useState(getStatisticsOption([], t));

  const exportFile = useRef<any>();

  useEffect(() => {
    setParams(getStatisticsOption(statistics.donations, t));
  }, [statistics]);

  const handleOnClick = (timeInterval: TimeInterval) => {
    setSelectedInterval(timeInterval);
    fetchStatistics({ id: projectId, timeInterval });
  };

  const handleExcelExport = () => {
    if (exportFile.current !== null) {
      exportFile.current.save();
    }
  };

  return (
    <Col className={classes['statistics-wrapper']}>
      <div className={classes['statistics-card-wrapper']}>
        <Row>
          <header className={classes['statistics-topic']}>
            Global Statistics
          </header>
          {Object.entries(statistics.statistics).map(([key, val]) => (
            <Card key={key} title={key} value={val.toString()} />
          ))}
        </Row>
      </div>
      <div className={classes['statistics-topic-wrapper']}>
        <header className={classes['statistics-topic']}>
          Donation Statistics
        </header>
        <Button
          className={classes['export-button']}
          variant="secondary"
          onClick={handleExcelExport}
        >
          <p className={classes['export-button-text']}>Export</p>
        </Button>
      </div>
      <ExcelExport data={statistics.donations} ref={exportFile}>
        <ExcelExportColumn field="donated" title="Donated" locked width={200} />
        <ExcelExportColumn field="donationCreatedAt" title="Date" width={400} />
        <ExcelExportColumn field="firstName" title="Firstname" width={200} />
        <ExcelExportColumn field="lastName" title="Lastname" width={200} />
      </ExcelExport>
      <div className={classes['statistics-button-wrapper']}>
        {Object.values(TimeInterval).map((el) => (
          <TimeButton
            key={el}
            timeInterval={el}
            onHandleClick={handleOnClick}
            isSelected={el === selectedInterval}
          />
        ))}
      </div>
      <div className={classes['statistics-chart-wrapper']}>
        {statistics.donations.length <= 0 && (
          <p className={classes['statistics-chart-text']}>No data</p>
        )}
        <Chart
          type={params.type}
          labels={params.labels}
          dataSets={params.dataSets}
          options={params.options}
          height="350px"
        />
      </div>
    </Col>
  );
};

export default Statistics;
