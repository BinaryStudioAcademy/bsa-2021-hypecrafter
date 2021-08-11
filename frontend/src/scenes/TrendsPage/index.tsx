import { FC } from 'react';
import { Container } from 'react-bootstrap';
import classes from './styles.module.scss';
import { tags, projects, categories } from './data';
import { useLocalization } from '../../providers/localization';
import { TagsChart, ProjectsChart } from './components';
import { getTagsOptions, getProjectsOptions } from './options';

const TrendsPage: FC = () => {
  const { t, changeLanguage } = useLocalization();

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
