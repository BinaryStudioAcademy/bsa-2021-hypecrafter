import { FC } from 'react';
import Button from '../../../../components/Button';
import { useAction } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import classes from '../../styles.module.scss';

const Failure: FC = () => {
  const { hideDonateModalAction } = useAction();
  const { t } = useLocalization();
  return (
    <>
      <h2 className={classes['donate-title-fail']}>{t('Donate was failed')}</h2>
      <p className={classes['donate-sadface-fail']}>😔</p>
      <p className={classes['donate-description-fail']}>
        {t('Perhaps you do not have enough money on your balance or the donation time is over')}
      </p>
      <Button
        type="button"
        variant='secondary'
        onClick={hideDonateModalAction}
        className={classes['donate-close-btn']}
      >
        {t('Return to Project Page')}
      </Button>
    </>
  );
};
export default Failure;
