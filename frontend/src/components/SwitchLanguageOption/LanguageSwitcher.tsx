import { Languages } from '../../common/enums';
import { useLocalization } from '../../providers/localization';

const LanguageSwitcher = () => {
  const { t, changeLanguage, selectedLanguage: currLang } = useLocalization();
  const otherLanguage = currLang === Languages.EN ? Languages.UA : Languages.EN;
  const currentText = `${t('Switch to')} ${otherLanguage.toUpperCase()}`;
  const switchHandler = () => {
    if (currLang === Languages.EN) changeLanguage(Languages.UA);
    else changeLanguage(Languages.EN);
  };
/* eslint-disable */
  return (
    <a style={{textDecoration: 1}} href="#" onClick={switchHandler}>
      {currentText}
    </a>
  );
};
/* eslint-enable */
export default LanguageSwitcher;
