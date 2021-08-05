import { FC } from 'react';
import mainBg from '../../assets/main_bg.png';
import classes from './styles.module.scss';
import Button from '../../components/Button';
import ProjectCard from '../../components/ProjectCard';
import Chart from '../../components/Chart/Chart';
import defaultProps from '../../components/Chart/testprops';

const MainPage: FC = () => {
  // Mocked Data

  const popularStartups = [
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile'],
      name: 'Card Title',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
          classical Latin literature from 45 BC, making it over 2000 years old.`,
      goal: 10000,
      percent: 50,
      image: 'https://source.unsplash.com/random/800x600' },
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile'],
      name: 'Mendi: Real Brain Training - Anytime, Anywhere',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
      classical Latin literature from 45 BC, making it over 2000 years old.`,
      goal: 1000,
      percent: 30,
      image: 'https://source.unsplash.com/random/800x600' },
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile'],
      name: 'Card Title',
      description: 'Card Description',
      goal: 50000,
      percent: 70,
      image: 'https://source.unsplash.com/random/800x600' }];

  const recommendedStartups = [
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile'],
      name: 'Card Title',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years old.`,
      goal: 10000,
      percent: 50,
      image: 'https://source.unsplash.com/random/800x600' },
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile'],
      name: 'Mendi: Real Brain Training - Anytime, Anywhere',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
          classical Latin literature from 45 BC, making it over 2000 years old.`,
      goal: 1000,
      percent: 30,
      image: 'https://source.unsplash.com/random/800x600' },
    { category: 'Health',
      tags: ['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile'],
      name: 'Card Title',
      description: 'Card Description',
      goal: 50000,
      percent: 70,
      image: 'https://source.unsplash.com/random/800x600' }];
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
        <div className={classes['main-bg']}>
          <img src={mainBg} alt="main" />
        </div>
      </div>
      <div>
        <div className={classes.category}>Popular startups</div>
        <div className={classes.cards}>
          {popularStartups.map(project => (
            <ProjectCard
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
