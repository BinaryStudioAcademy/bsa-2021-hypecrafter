import { FC } from 'react';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePicker';
import Input from '../../../../components/Input';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: any) => void,
  goal: number,
  startDate?: Date,
  finishDate?: Date,
}

const Funding: FC<Props> = ({ changePage, currentPage, onChangeValue, goal, startDate, finishDate }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);
  const body = (
    <div>
      <Input
        type="number"
        label={t('Set an achievable goal that covers what you need to complete your project.')}
        onChange={e => onChangeValue(ProjectKeys.GOAL, e.target.value)}
        value={goal}
      />
      <p>{t('Decide on the terms for which you want to collect the above amount')}</p>
      <div className={classes.dateBlock}>
        <DatePickerInput daySetter={day => onChangeValue(ProjectKeys.START_DATE, day)} value={startDate} />
        <DatePickerInput daySetter={day => onChangeValue(ProjectKeys.FINISH_DATE, day)} value={finishDate} />
      </div>
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Continue')}</Button>
    </div>
  );
  return (
    <Layout
      header={t('Campaign Goal')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Funding;
