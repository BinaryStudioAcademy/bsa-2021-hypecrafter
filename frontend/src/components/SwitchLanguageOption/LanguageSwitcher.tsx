import { Languages } from '../../common/enums';
import { useLocalization } from '../../providers/localization';
import classes from './styles.module.scss';

const LanguageSwitcher = () => {
  const { t, changeLanguage, selectedLanguage: currLang } = useLocalization();
  const otherLanguage = currLang === Languages.EN ? Languages.UA : Languages.EN;
  const currentText = t('Switch to', { lang: otherLanguage.toUpperCase() });
  const switchHandler = () => changeLanguage(otherLanguage);

  return (
    <button type="button" className={classes.switchBtn} onClick={switchHandler}>
      {currentText}
    </button>
  );
};

export default LanguageSwitcher;
