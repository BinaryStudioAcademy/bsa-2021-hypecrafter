import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Routes } from '../../../../common/enums';
import { CreateProject, Project } from '../../../../common/types';
import ProjectCard from '../../../../components/ProjectCard';
import { useLocalization } from '../../../../providers/localization';
import { getPopularAndRecommendedProjects } from '../../../../services/projects';
import { CurrentPage } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  project: CreateProject,
}

const Recommendations: FC<Props> = ({ changePage, currentPage, project }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getPopularAndRecommendedProjects().then(({ recommended }) => setProjects(recommended));
  }, []);

  // tags
  // categories
  // country
  // period
  console.log(project); // remove

  const body = (
    <div>
      <p>{t('Let’s look at similar projects')}</p>
      <div className={classes.projects}>
        {projects.map((proj: Project) => (
          <ProjectCard
            key={proj.id}
            to={`${Routes.PROJECTS}/${proj.id}`}
            category={proj.category}
            tags={proj.tags}
            name={proj.name}
            description={proj.description}
            goal={proj.goal}
            percent={(proj.donated * 100) / proj.goal}
            image={proj.imageUrl}
          />
        ))}
      </div>
    </div>
  );

  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Create Project')}</Button>
    </div>
  );

  return (
    <Layout
      header={t('Campaign Goal')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Recommendations;
