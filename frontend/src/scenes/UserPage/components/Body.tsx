import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProjectCard from '../../../components/ProjectCard';
import { Tab } from '../../../components/Tabs';
import { calcDonationProgress } from '../../../helpers/project';
import { Project } from '../interfaces';
import classes from '../styles.module.scss';

interface BodyProps {
  projects: Project[];
}

interface CardsGridProps {
  target: string;
  projects?: Project[];
}

const CardsGrid: FunctionComponent<CardsGridProps> = ({
  target,
  projects = []
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

  return null;
};

const Body: FunctionComponent<BodyProps> = ({
  projects
}) => (
  <div className={classes['body-container']}>
    <Row>
      <Col xs={12} lg={8}>
        <Tab title='Projects'>
          <CardsGrid projects={projects} target='Projects' />
        </Tab>
      </Col>
    </Row>
  </div>
);

export default Body;
