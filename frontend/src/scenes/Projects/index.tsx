import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import ProjectCard from '../../components/ProjectCard';
import { useAction, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Filters from './components/Filters';
import classes from './styles.module.scss';

const Projects = () => {
  const { projects, modificators } = useTypedSelector((state) => state.projects);
  const { fetchProjectsAction } = useAction();
  const { t } = useLocalization();

  useEffect(() => {
    fetchProjectsAction(modificators);
  }, [modificators]);

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
                key={project.id}
                to={`${Routes.LOGIN}/${project.id}`}
                category={project.category}
                tags={project.tags}
                name={project.name}
                description={project.description}
                goal={project.goal}
                percent={(project.donated * 100) / project.goal}
                image={project.imageUrl}
              />
            ))}
            {!projects.length && (
              <Container className={classes['error-wrapper']}>
                {t('There are no projects that match these search parameters')}
              </Container>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
