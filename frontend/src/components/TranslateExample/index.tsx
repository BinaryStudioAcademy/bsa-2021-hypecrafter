import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TranslateExample = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <Button onClick={() => i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua')}>
        {t('Press on me')}
      </Button>
    </Container>

  );
};
export default TranslateExample;
