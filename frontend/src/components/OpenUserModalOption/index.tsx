import { useAction } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

const OpenUserModal = () => {
  const { openModalAction } = useAction();
  const { t } = useLocalization();

  const clickHandler = () => openModalAction('ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529');

  return (
    <button type="button" className={classes['open-modal-btn']} onClick={clickHandler}>
      {t('View account')}
    </button>
  );
};

export default OpenUserModal;
