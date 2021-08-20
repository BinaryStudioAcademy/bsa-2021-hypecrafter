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
  onChangeValue: (name: ProjectKeys, value: string) => void
  region: string
}

const Settings: FC<Props> = ({ changePage, currentPage, onChangeValue, region }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);
  const body = (
    <div>
      <Input
        type="text"
        label={t('Your location can be a key factor for the investor in your favor.')}
        onChange={e => onChangeValue(ProjectKeys.REGION, e.target.value)}
        value={region}
      />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Create Project')}</Button>
    </div>
  );
  return (
    <Layout
      header={t('Finally')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Settings;
