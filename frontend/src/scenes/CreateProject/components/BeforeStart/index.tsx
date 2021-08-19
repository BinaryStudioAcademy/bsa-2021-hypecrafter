import { FC, useState } from 'react';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage:CurrentPage
}

const BeforeStart: FC<Props> = ({ changePage, currentPage }) => {
  const { t } = useLocalization();
  const [checked, setChecked] = useState(false);
  const handleChangePage = () => changePage(CurrentPage.BASIC);

  const handleChange = () => {
    setChecked(!checked);
  };
  const body = (
    <div>
      <p className={classes.text}>{t('Agreement') + t('Agreement') + t('Agreement') + t('Agreement') + t('Agreement')}
      </p>
      <Checkbox label={t('I agree with privacy consent')} value={checked} onChange={handleChange} id="agreePrivacy" />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleChangePage} disable={!checked}>{t('Create Project')}</Button>
    </div>
  );

  return (
    <Layout
      header={t('Before we start...')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default BeforeStart;
