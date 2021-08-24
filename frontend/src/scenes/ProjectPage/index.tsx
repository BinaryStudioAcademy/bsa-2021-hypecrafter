import { FC, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { Tab, Tabs } from '../../components/Tabs';
import { useAction, useTypedSelector } from '../../hooks';
import Comments from './components/Comments';
import FAQ from './components/FAQ';
import Header from './components/Header';
import Story from './components/Story';
import classes from './styles.module.scss';

const ProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchProject } = useAction();
  const { project, isLoading } = useTypedSelector(({ projectPage }) => ({
    project: projectPage.project,
    isLoading: projectPage.isLoading
  }));

  useEffect(() => {
    fetchProject(id);
  }, []);

  return (
    <LoaderWrapper isLoading={isLoading} variant="page">
      <Container className={classes.container}>
        <Row>
          <Header project={project} />
        </Row>
        <Row>
          <Tabs>
            <Tab title="Story">
              <Story
                story={project.story}
                privileges={project.privileges}
                tags={project.tags}
              />
            </Tab>
            <Tab title="FAQ">
              <FAQ faqs={project.FAQ} />
            </Tab>
            <Tab title="Comments">
              <Comments comments={project.projectComments} />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </LoaderWrapper>
  );
};

export default ProjectPage;
