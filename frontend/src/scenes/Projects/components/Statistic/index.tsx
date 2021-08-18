import { Col, Container, Row } from 'react-bootstrap';
import { useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import classes from './styles.module.scss';

const Statistic = () => {
  const { t } = useLocalization();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const projects = useTypedSelector(({ projects: { projects } }) => projects);

  return (
    <Container className={classes.statistic}>
      <Row>
        <Col>
          {`${projects.length} ${t('projects found')}`}
        </Col>
      </Row>
    </Container>
  );
};

export default Statistic;
