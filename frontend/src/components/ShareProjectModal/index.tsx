import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row } from 'react-bootstrap';
import Clipboard from 'react-clipboard.js';
import classes from './styles.module.scss';

function ShareProjectModal() {
  const testUrl = 'http://localhost:3000/projects/d51adf1a-b777-41c1-8a52-49ec5b652a35';

  return (
    <Container>
      <Row className={classes['social-links-container']}>
        Social Links
      </Row>
      <Row className={classes['clipboard-container']}>
        <Clipboard data-clipboard-text={testUrl} className={classes.clipboard}>
          <span>{testUrl}</span>
          <FontAwesomeIcon icon={faClipboard} className={classes['clipboard-icon']} />
        </Clipboard>
      </Row>
    </Container>
  );
}

export default ShareProjectModal;

