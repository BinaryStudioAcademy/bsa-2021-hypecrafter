import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { useAction, useTypedSelector } from '../../hooks';
import Header from './components/Header';
import classes from './styles.module.scss';

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
  useEffect(() => {
    fetchProject(id);
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading} variant='page'>
      <Container>
        <Row>
          <Header project={project} />
        </Row>
        <Row>
          <hr className={classes['horizontal-line']} />
        </Row>
      </Container>
    </LoaderWrapper>
  );
}

export default ProjectPage;
