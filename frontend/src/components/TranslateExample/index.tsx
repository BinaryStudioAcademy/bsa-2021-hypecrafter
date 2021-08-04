import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Languages } from '../../common/enums';
import { useLocalization } from '../../providers/localization';

const TranslateExample = () => {
  const { t, changeLanguage, selectedLanguage } = useLocalization();
  return (
    <Container>
      <Button
        onClick={() => changeLanguage(selectedLanguage === Languages.UA
          ? Languages.EN : Languages.UA)}
      >
        <FontAwesomeIcon icon={faSearch} /> {t('Press on me')}
      </Button>
    </Container>
  );
};
export default TranslateExample;
