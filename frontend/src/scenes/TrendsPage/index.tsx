import { FC } from 'react';
import { Container } from 'react-bootstrap';
import classes from './styles.module.scss';
import { tags, projects, categories } from './data';
import { TagsChart, ProjectsChart } from './components';
import { getTagsOptions, getProjectsOptions } from './options';

const TrendsPage: FC = () => {
  const defProps = getProjectsOptions(projects);
  const defaultProps = getTagsOptions(tags);

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <TagsChart defaultParams={defaultProps} />
        <ProjectsChart defaultParams={defProps} categories={categories} />
      </Container>
    </div>
  );
};

export default TrendsPage;
