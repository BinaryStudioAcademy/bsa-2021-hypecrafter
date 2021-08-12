import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useLocalization } from '../../providers/localization';
import { ProjectsChart, TagsChart } from './components';
import { categories, projects, tags } from './data';
import { getProjectsOptions, getTagsOptions } from './options';
import classes from './styles.module.scss';

const TrendsPage: FC = () => {
  const { t } = useLocalization();

  const defProps = getProjectsOptions(projects);
  const defaultProps = getTagsOptions(tags);

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <TagsChart defaultParams={defaultProps} t={t} />
        <ProjectsChart defaultParams={defProps} categories={categories} t={t} />
      </Container>
    </div>
  );
};

export default TrendsPage;
