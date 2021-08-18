import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from '../../../components/Card';
import ProjectCard from '../../../components/ProjectCard';
import { Tab, Tabs } from '../../../components/Tabs';
import { calcDonationProgress } from '../../../helpers/project';
import { Achievement, Activity, Project } from '../interfaces';
import classes from '../styles.module.scss';

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
  if (target === 'Projects') {
    const renderProjectsList = () => projects.map((project) => (
      <ProjectCard
        key={project.id}
        to={project.url}
        name={project.name}
        description={project.description}
        category={project.category}
        tags={project.tags}
        image={project.imageUrl}
        percent={calcDonationProgress(project.donated, project.goal)}
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

  if (target === 'Achievements') {
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
  const renderActivitiesList = () => activities.map((activity) => (
    <div className={classes['activity-container']} key={activity.id}>
      {activity.name}
    </div>
  ));
  const activitiesList = renderActivitiesList();

  return (
    <div className={classes['body-container']}>
      <Row>
        <Col xs={12} lg={8}>
          <Tabs>
            <Tab title='Projects'>
              <CardsGrid projects={projects} achievements={achievements} target='Projects' />
            </Tab>
            <Tab title='Achievements'>
              <CardsGrid projects={projects} achievements={achievements} target='Achievements' />
            </Tab>
          </Tabs>
        </Col>
        <Col xs={12} lg={4}>
          <h3 className={classes['activity-header']}>Activity</h3>
          {activitiesList}
        </Col>
      </Row>
    </div>
  );
};

export default Body;
