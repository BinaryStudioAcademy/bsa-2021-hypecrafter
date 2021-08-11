import { Alert, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

function BootstrapExample() {
  return (
    <Container>
      <Row style={{ marginTop: '2rem' }}>
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Here is example of using react-bootstrap Alert component. This example
            text is going to run a bit longer so that you can see how spacing within an
            alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Below you can find some more examples of using react-bootstrap components and grid
          </p>
        </Alert>
      </Row>

      <Row style={{ marginTop: '2rem' }}>
        <h3>Card Example:</h3>
        <Col lg="auto">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://source.unsplash.com/random/800x600" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card`s content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '2rem' }}>
        <h3>Images Grid Example:</h3>
        <Col xs={6} lg={4}>
          <Image src="https://source.unsplash.com/random/171x180" rounded />
        </Col>
        <Col xs={6} lg={4}>
          <Image src="https://source.unsplash.com/random/171x180" roundedCircle />
        </Col>
        <Col xs={6} lg={4}>
          <Image src="https://source.unsplash.com/random/171x180" thumbnail />
        </Col>
      </Row>
    </Container>
  );
}

export default BootstrapExample;
