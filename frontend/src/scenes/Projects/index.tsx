import {
  ProjectsCategories, ProjectsFilter, ProjectsSort
} from 'hypecrafter-shared/enums';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import ProjectCard from '../../components/ProjectCard';
import Seo from '../../components/Seo';
import { runActionWithArrayOfEnumValues, runActionWithEnumValue } from '../../helpers';
import { useAction, useAuth, useQuery, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Filters from './components/Filters';
import classes from './styles.module.scss';

const Projects = () => {
  const { id: userId } = useAuth();
  const { projects, modificators } = useTypedSelector((state) => state.projects);
  const {
    fetchProjectsAction,
    sortProjectsAction,
    filterProjectsAction,
    filterCategoriesProjectsAction,
    upcomingProjectsAction
  } = useAction();
  const {
    sort: sortQuery,
    filter: filterQuery,
    categories: categoriesQuery,
    upcoming: upcomingQuery
  } = useQuery();
  const { t } = useLocalization();

  useEffect(() => {
    fetchProjectsAction({ ...modificators, userId });
  }, [modificators]);

  useEffect(() => {
    runActionWithEnumValue(sortQuery, ProjectsSort, sortProjectsAction);
    runActionWithEnumValue(filterQuery, ProjectsFilter, filterProjectsAction);
    runActionWithArrayOfEnumValues(categoriesQuery, ProjectsCategories, filterCategoriesProjectsAction);
    upcomingProjectsAction(upcomingQuery);
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
                to={`${Routes.PROJECTS}/${project.id}`}
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
