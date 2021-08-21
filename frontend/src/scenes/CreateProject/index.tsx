import { useState } from 'react';
import { CreateProject as Project } from '../../common/types';
import LoaderWrapper from '../../components/LoaderWrapper';
import { useAction, useTypedSelector } from '../../hooks';
import Basic from './components/Basic';
import BeforeStart from './components/BeforeStart';
import Funding from './components/Funding';
import Settings from './components/Settings';
import Story from './components/Story';
import Team from './components/Team';
import { CurrentPage, ProjectKeys } from './enums';

// import classes from './styles.module.scss';

const CreateProject = () => {
  const initProject: Project = {
    name: '',
    description: '',
    category: '',
    content: '',
    goal: 0,
    region: '',
    team: { name: '', chats: [] },
    imageUrl: '',
    tags: []
  };
  const [currentPage, setCurrentPage] = useState(CurrentPage.BEFORE_START);
  const [newProject, setNewProject] = useState(initProject);
  const { createProjectAction } = useAction();
  const createProject = (project:Project) => createProjectAction(project);
  const store = useTypedSelector(({ project: { project, isLoading } }) => ({
    project,
    isLoading
  }));
  const { isLoading } = store;
  const end = (page: CurrentPage) => {
    if (page === CurrentPage.END) {
      const project = createProject(newProject);
      console.log(project);
    }
  };
  const handleChangeValue = (name: ProjectKeys, value: any) => {
    setNewProject({ ...newProject, [name]: value });
  };
  const getView = () => {
    switch (currentPage) {
      case CurrentPage.BEFORE_START:
        return <BeforeStart changePage={setCurrentPage} currentPage={currentPage} />;
      case CurrentPage.BASIC:
        return (
          <Basic
            changePage={setCurrentPage}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            name={newProject.name}
            description={newProject.description}
            category={newProject.category}
          />
        );
      case CurrentPage.STORY:
        return (
          <Story
            changePage={setCurrentPage}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            content={newProject.content}
          />
        );
      case CurrentPage.TEAM:
        return (
          <Team
            changePage={setCurrentPage}
            currentPage={currentPage}
            team={newProject.team}
            onChangeValue={handleChangeValue}
          />
        );
      case CurrentPage.FUNDING:
        return (
          <Funding
            changePage={setCurrentPage}
            goal={newProject.goal}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            startDate={newProject.startDate}
            finishDate={newProject.finishDate}
          />
        );
      case CurrentPage.SETTINGS:
        return (
          <Settings
            changePage={end}
            region={newProject.region}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            imageUrl={newProject.imageUrl}
          />
        );
      case CurrentPage.END:
        return (
          <Settings
            changePage={end}
            region={newProject.region}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
          />
        );
      default:
        return <BeforeStart changePage={setCurrentPage} currentPage={currentPage} />;
    }
  };
  return (
    <LoaderWrapper isLoading={isLoading}>
      {getView()}
    </LoaderWrapper>
  );
};

export default CreateProject;
