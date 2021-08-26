import { FC, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { Tab, Tabs } from '../../components/Tabs';
import { useAction, useAuth, useTypedSelector } from '../../hooks';
import Comments from './components/Comments';
import FAQ from './components/FAQ';
import Header from './components/Header';
import Story from './components/Story';
import classes from './styles.module.scss';

const ProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchProject } = useAction();
  const { id: userId, isAuthorized } = useAuth();
  const { project, isLoading } = useTypedSelector(
    (
      { projectPage }
    ) => ({
      project: projectPage.project,
      isLoading: projectPage.isLoading,
    })
  );

  useEffect(() => {
    fetchProject({ id, userId });
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading} variant='page'>
      <Container className={classes.container}>
        <Row>
          <Header project={project} isAuthorized={isAuthorized} />
        </Row>
        <Row>
          <Tabs>
            <Tab title="Story">
              <Story />
            </Tab>
            <Tab title="FAQ" amount={project.FAQ.length}>
              <FAQ faqs={project.FAQ} />
            </Tab>
            <Tab title="Comments" amount={project.projectComments.length}>
              <Comments />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </LoaderWrapper>
  );
};

export default ProjectPage;
