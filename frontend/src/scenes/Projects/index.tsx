import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProjectCard from '../../components/ProjectCard';
import { useAction, useTypedSelector } from '../../hooks';
import { Project } from './common/types';
import Filters from './components/Filters';
import mockProjects from './projects.json';
import classes from './styles.module.scss';

const Projects = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const projects = useTypedSelector(({ projects: { projects } }) => projects);
  const { getProjectsAction } = useAction();

  useEffect(() => {
    getProjectsAction(mockProjects);
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <Filters />
        </Col>

        <Col lg={9}>
          <Container className={classes['projects-wrapper']}>
            {projects.map((project: Project) => (
              <ProjectCard
                key={project.ID}
                to={`/projects/${project.ID}`}
                category={project.Category}
                tags={['Bike', 'Speed', 'Mile']} // update later
                name={project.Name}
                description={project.Description}
                goal={project.Goal}
                percent={30} // update later / how to get value?
                image="https://source.unsplash.com/random/800x600" // update later / how to get value?
              />
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
