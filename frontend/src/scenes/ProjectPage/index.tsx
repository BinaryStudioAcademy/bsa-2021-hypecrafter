import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAction, useTypedSelector } from '../../hooks';
import Header from './components/Header';
// import classes from './styles.module.scss';

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { fetchProject } = useAction();
  const { project, isLoading } = useTypedSelector(
    (
      { projectPage }
    ) => ({
      project: projectPage.project,
      isLoading: projectPage.isLoading,
    })
  );
  console.log(project, isLoading);
  useEffect(() => {
    fetchProject(id);
  }, []);

  return (
    <Container>
      <Row>
        <Header project={project} />
      </Row>
    </Container>
  );
}

export default ProjectPage;
