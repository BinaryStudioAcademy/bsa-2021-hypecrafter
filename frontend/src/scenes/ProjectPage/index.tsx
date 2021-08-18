import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { Tab, Tabs } from '../../components/Tabs';
import { useAction, useTypedSelector } from '../../hooks';
import Comments from './components/Comments';
import FAQ from './components/FAQ';
import Header from './components/Header';
import Story from './components/Story';

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
    fetchProject('2808acdc-e4c8-4d67-85b9-ee91d09942bb');
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading} variant='page'>
      <Container>
        <Row>
          <Header project={project} />
        </Row>
        <Row>
          <Tabs>
            <Tab title="Story">
              <Story />
            </Tab>
            <Tab title="FAQ">
              <FAQ />
            </Tab>
            <Tab title="Comments">
              <Comments />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </LoaderWrapper>
  );
}

export default ProjectPage;
