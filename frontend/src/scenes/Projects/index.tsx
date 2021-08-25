import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import ProjectCard from '../../components/ProjectCard';
import Seo from '../../components/Seo';
import { runActionWithValueOfEnum } from '../../helpers';
import { useAction, useQuery, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Filters from './components/Filters';
import classes from './styles.module.scss';

const Projects = () => {
  const { projects, modificators } = useTypedSelector((state) => state.projects);
  const { fetchProjectsAction, sortProjectsAction, filterProjectsAction } = useAction();
  const query = useQuery();
  const { t } = useLocalization();

  useEffect(() => {
    fetchProjectsAction(modificators);
  }, [modificators]);

  useEffect(() => {
    const sortParam = query.get('sort');
    const filterParam = query.get('filter');
    runActionWithValueOfEnum(sortParam, ProjectsSort, sortProjectsAction);
    runActionWithValueOfEnum(filterParam, ProjectsFilter, filterProjectsAction);
  }, []);

  return (
    <Container className={classes['projects-page']}>
      <Seo
        title={`${t('Projects')} - HypeCrafter`}
        description=""
      />

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
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Projects;
