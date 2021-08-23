import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import ProjectCard from '../../components/ProjectCard';
import { getEnumKeyByEnumValue } from '../../helpers/enum';
import { useAction, useQuery, useTypedSelector } from '../../hooks';
import Filters from './components/Filters';
import classes from './styles.module.scss';

const Projects = () => {
  const { projects, modificators } = useTypedSelector((state) => state.projects);
  const {
    fetchProjectsAction,
    sortProjectsAction,
    filterProjectsAction
  } = useAction();
  const query = useQuery();

  useEffect(() => {
    fetchProjectsAction(modificators);
  }, [modificators]);

  useEffect(() => {
    const sortQuery = query.get('sort');
    if (sortQuery) {
      const sortValue = getEnumKeyByEnumValue(ProjectsSort, sortQuery);
      if (sortValue) {
        sortProjectsAction(ProjectsSort[sortValue]);
      }
    }

    const filterQuery = query.get('filter');
    if (filterQuery) {
      const filterValue = getEnumKeyByEnumValue(ProjectsFilter, filterQuery);
      if (filterValue) {
        filterProjectsAction(ProjectsFilter[filterValue]);
      }
    }
  }, []);

  return (
    <Container className={classes['projects-page']}>
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
