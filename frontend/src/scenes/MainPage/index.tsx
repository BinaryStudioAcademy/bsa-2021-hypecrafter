import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import { fetchPopularProjectsAction, fetchRecommendedProjectsAction } from '../../actions/projects';
import classes from './styles.module.scss';
import Button from '../../components/Button';
import ProjectCard from '../../components/ProjectCard';
import Chart from '../../components/Chart/Chart';
import defaultProps from './chartProps';

const MainPage: FC = () => {
  // Mocked Data
  const dispatch = useDispatch();
  const { popular: popularStartups, recommended: recommendedStartups } = useTypedSelector((
    { projects: { popular, recommended } }
  ) => ({
    popular, recommended
  }));

  useEffect(() => {
    dispatch(fetchRecommendedProjectsAction());
    dispatch(fetchPopularProjectsAction());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes['main-text']}>
          <div className={classes['main-logo-text']}>
            <div>
              <span className={classes.logo}>
                HypeCrafter
              </span> faithful assistant
            </div>
          </div>
          <div className={classes['logo-text']}>
            Do you have a good and well thought-out idea and are you ready
            to conquer the peaks on your own to make your dream come true?
            But sometimes, alone, the difficult path from concept to finished
            product is not easy at all. HypeCrafter will lend a helping hand,
            and more than one!
          </div>
          <div className={classes.buttons}>
            <Button type="button">Create Project</Button>
            <Button type="button" isOutline>Help Project</Button>
          </div>
        </div>
        <div className={classes['main-bg']} />
      </div>
      <div>
        <div className={classes.category}>Popular startups</div>
        <div className={classes.cards}>
          {popularStartups.map(project => (
            <ProjectCard
              key={project.id}
              to="/"
              category={project.category}
              tags={project.tags}
              name={project.name}
              description={project.description}
              goal={project.goal}
              percent={project.percent}
              image={project.image}
            />
          ))}
        </div>
        <div className={classes.category}>Recommended for you</div>
        <div className={classes.cards}>
          {recommendedStartups.map(project => (
            <ProjectCard
              key={project.id}
              to="/"
              category={project.category}
              tags={project.tags}
              name={project.name}
              description={project.description}
              goal={project.goal}
              percent={project.percent}
              image={project.image}
            />
          ))}
        </div>
        <div className={classes.category}>Interesting topics</div>
        <Chart type="bar" labels={defaultProps.data.labels} dataSets={defaultProps.data.datasets} />
      </div>
    </div>
  );
};

export default MainPage;
