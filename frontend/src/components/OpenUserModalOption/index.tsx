import { useAction, useAuth } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

const OpenUserModal = () => {
  const { openModalAction } = useAction();
  const { t } = useLocalization();
  const { id } = useAuth();

  const clickHandler = () => id && openModalAction(id);

  return (
    <button type="button" className={classes['open-modal-btn']} onClick={clickHandler}>
      {t('View account')}
    </button>
  );
};

export default OpenUserModal;
