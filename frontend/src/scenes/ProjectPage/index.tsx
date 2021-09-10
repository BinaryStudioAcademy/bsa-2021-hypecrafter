import { FC, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { Tab, Tabs } from '../../components/Tabs';
import {
  useAction,
  useAuth, useCountTimeOnPage, useTypedSelector
} from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Comments from './components/Comments';
import FAQ from './components/FAQ';
import Header from './components/Header';
import Statistics from './components/Statistics';
import Story from './components/Story';
import classes from './styles.module.scss';

const ProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLocalization();
  const { fetchProject, updateViewsAndInteractionTimeAction } = useAction();
  const { id: userId, isAuthorized } = useAuth();
  const { project, isLoading } = useTypedSelector(
    (
      { projectPage }
    ) => ({
      project: projectPage.project,
      isLoading: projectPage.isLoading,
    })
  );

  const handleUpdateViewsAndInteractionTime = (interactionTime: number) => (
    updateViewsAndInteractionTimeAction({ id, interactionTime })
  );

  useCountTimeOnPage(handleUpdateViewsAndInteractionTime);

  useEffect(() => {
    fetchProject({ id, userId });
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading} variant="page">
      <Container className={classes.container}>
        <Row>
          <Header project={project} isAuthorized={isAuthorized} userId={userId} authorId={project.authorId} />
        </Row>
        <Row className={classes['block-wrapper']}>
          <Tabs>
            <Tab title="Story">
              <Story
                story={project.story}
                privileges={project.privileges}
                tags={project.tags}
              />
            </Tab>
            <Tab title="FAQ" counter={project.FAQ?.length}>
              <FAQ faqs={project.FAQ} />
            </Tab>
            <Tab title="Comments" counter={project.projectComments?.length}>
              <Comments comments={project.projectComments} projectId={id} />
            </Tab>
            <Tab title="Statistics">
              <Statistics t={t} projectId={project.id} />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </LoaderWrapper>
  );
};

export default ProjectPage;
