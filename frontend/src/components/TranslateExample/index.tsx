import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../common/enums';

const TranslateExample = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Button
        onClick={() => i18n.changeLanguage(i18n.language === Languages.UA
          ? Languages.EN : Languages.UA)}
      >
        <FontAwesomeIcon icon={faSearch} /> {t('Press on me')}
      </Button>
    </Container>
  );
};

export default TranslateExample;
