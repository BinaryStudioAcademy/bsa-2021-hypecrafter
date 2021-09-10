import { FC, useEffect } from 'react';
import Button from '../../../../components/Button';
import { useAction, useAuth, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import classes from '../../styles.module.scss';

const Success: FC = () => {
  const { hideDonateModalAction, fetchProject } = useAction();
  const { t } = useLocalization();
  const { id: userId } = useAuth();
  const {
    projectId
  } = useTypedSelector(({ donate }) => donate);
  useEffect(() => {
    fetchProject({ id: projectId, userId });
  }, []);
  return (
    <>
      <h2 className={classes['donate-title-success']}>{t('Donate was successful')}</h2>
      <p className={classes['donate-gladface-fail']}>😄</p>
      <Button
        type="button"
        variant='secondary'
        className={classes['donate-close-btn']}
        onClick={hideDonateModalAction}
      >
        {t('Return to Project Page')}
      </Button>
    </>
  );
};
export default Success;
