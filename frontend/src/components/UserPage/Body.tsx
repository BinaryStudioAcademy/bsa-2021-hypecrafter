import { FunctionComponent, MouseEvent, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../Card';
import ProjectCard from '../ProjectCard';
import { Achievement, Activity, Project } from './interfaces';
import classes from './styles.module.scss';

interface BodyProps {
  projects: Project[];
  achievements: Achievement[];
  activities: Activity[];
}

interface CardsGridProps {
  target: string;
  projects?: Project[];
  achievements?: Achievement[];
}

const CardsGrid: FunctionComponent<CardsGridProps> = ({
  target,
  projects = [],
  achievements = []
}) => {
  if (target === 'projects') {
    const renderProjectsList = () => projects.map((project) => (
      <ProjectCard
        key={project.id}
        to={project.url}
        name={project.name}
        description={project.description}
        category={project.category}
        tags={project.tags}
        image={project.imageUrl}
        percent={Math.floor((project.donated / project.goal) * 100)}
        goal={project.goal}
        rounded
      />
    ));

    const projectsList = renderProjectsList();

    return (
      <div className={classes['projects-grid']}>
        {projectsList}
      </div>
    );
  }

  if (target === 'achievements') {
    const renderAchievementsList = () => achievements.map((achievement) => (
      <Card
        key={achievement.id}
        image={achievement.imageUrl}
        rounded
      >
        <h4 className={classes['achievement-name']}>{achievement.name}</h4>
        <p>{achievement.description}</p>
      </Card>
    ));

    const achievementsList = renderAchievementsList();

    return (
      <div className={classes['achievements-grid']}>
        {achievementsList}
      </div>
    );
  }

  return null;
};

const Body: FunctionComponent<BodyProps> = ({
  projects,
  achievements,
  activities
}) => {
  const [selectedTab, setSelectedTab] = useState('projects');

  const handleTabChange = (e: MouseEvent<HTMLElement>) => setSelectedTab((e.target as HTMLInputElement).value);

  const renderActivitiesList = () => activities.map((activity) => (
    <div className={classes['activity-container']} key={activity.id}>
      {activity.name}
    </div>
  ));
  const activitiesList = renderActivitiesList();

  return (
    <div className={classes['body-container']}>
      <Row>
        <Col xs={12} md={8}>
          <div className={classes['body-tabs']}>
            <button
              className={`${classes['body-tab']} ${selectedTab === 'projects' && classes.selected}`}
              onClick={handleTabChange}
              value="projects"
              type="button"
            >
              Projects
            </button>
            <button
              className={`${classes['body-tab']} ${selectedTab === 'achievements' && classes.selected}`}
              onClick={handleTabChange}
              value="achievements"
              type="button"
            >
              Achievements
            </button>
          </div>

          <CardsGrid projects={projects} achievements={achievements} target={selectedTab} />
        </Col>
        <Col xs={12} md={4}>
          <h3 className={classes['activity-header']}>Activity</h3>
          {activitiesList}
        </Col>
      </Row>
    </div>
  );
};

export default Body;
