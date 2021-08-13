import { Col, Container, Image, Row } from 'react-bootstrap';
import classes from '../styles.module.scss';

function Header() {
  return (
    <Container>
      <Row>
        <Col xs={12} lg={5}>
          <Image src="https://source.unsplash.com/random/800x400" className={classes['project-image']} />
        </Col>
        <Col xs={12} lg={7}>
          <Row>
            <Col xs={10} lg={10}>
              <h3 className={classes['project-name']}>Project Name</h3>
            </Col>
            <Col xs={2} lg={2}>
              Svg
            </Col>
          </Row>
          <Row>
            <Col xs={10} lg={10}>
              <p className={classes['project-description']}>Suspendisse eleifend vehicula leo, in ornare turpis eleifend
                quis. Maecenas sit amet quam lacus. Quisque commodo lobortis ultrices.
                Curabitur feugiat augue ut consectetur pellentesque.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
