import { MouseEvent, useEffect, useState } from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoaderWrapper from '../../components/LoaderWrapper';
import { Tabs } from '../../components/Tabs';
import { useAction, useTypedSelector } from '../../hooks';
import Body from './components/Body';
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

  const [selectedTab, setSelectedTab] = useState('Story');
  const tabs = ['Story', 'FAQ', 'Comments'];

  const handleTabChange = (e: MouseEvent<HTMLElement>) => setSelectedTab((e.target as HTMLInputElement).innerText);

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
            <Tabs.Item {...selectedTab === tabs[0] && { selected: true }}>
              <Nav.Link onClick={handleTabChange}>{tabs[0]}</Nav.Link>
            </Tabs.Item>
            <Tabs.Item {...selectedTab === tabs[1] && { selected: true }}>
              <Nav.Link onClick={handleTabChange}>{tabs[1]}</Nav.Link>
            </Tabs.Item>
            <Tabs.Item {...selectedTab === tabs[2] && { selected: true }}>
              <Nav.Link onClick={handleTabChange}>{tabs[2]}</Nav.Link>
            </Tabs.Item>
          </Tabs>
        </Row>
        <Row>
          <hr className={classes['horizontal-line']} />
        </Row>
        <Row>
          <Body target={selectedTab} />
        </Row>
      </Container>
    </LoaderWrapper>
  );
}

export default ProjectPage;
