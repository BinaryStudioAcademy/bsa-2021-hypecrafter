import { Container, Row } from 'react-bootstrap';
import Header from './components/Header';
// import classes from './styles.module.scss';

const ProjectPage = () => {
  // Mocked Data
  const projectData = {
    id: '123',
    name: 'Rocket eBike: Self-Charging, 100-Mile Range eBike',
    // eslint-disable-next-line max-len
    description: 'Suspendisse eleifend vermicular leo, in ornare turpis eleifend quis. Maecenas sit amet quam lacus. Quisque commodo lobortis ultrices. Curabitur feugiat augue ut consectetur pellentesque.',
    category: 'Transport',
    imageUrl: 'https://source.unsplash.com/800x600/?portrait',
    tags: ['Bike', 'Electricity', 'Eco'],
    goal: 12000,
    donated: 10500,
    likes: 45,
    dislikes: 13,
    instagramUrl: '#',
    facebookUrl: '#',
    dribbleUrl: '#'
  };

  return (
    <Container>
      <Row>
        <Header project={projectData} />
      </Row>
    </Container>
  );
};

export default ProjectPage;
