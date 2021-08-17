import { FC } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: string) => void,
  goal:number
}

const Funding: FC<Props> = ({ changePage, currentPage, onChangeValue, goal }) => {
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
