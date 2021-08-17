import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createProjectAction } from './actions';
import Basic from './components/Basic';
import BeforeStart from './components/BeforeStart';
import Funding from './components/Funding';
import Settings from './components/Settings';
import Story from './components/Story';
import Team from './components/Team';
import { CurrentPage, ProjectKeys } from './enums';
import { CreateProject as Project } from './types/project';

// import classes from './styles.module.scss';

const CreateProject = () => {
  const initProject: Project = {
    name: '',
    description: '',
    category: '',
    content: '',
    goal: 0,
    region: '',

    imageUrl: '',
    tags: [],
    startDate: '2021-08-21 10:10:10',
    finishDate: '2021-08-21 10:10:10',

  };
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(CurrentPage.BEFORE_START);

  const [newProject, setNewProject] = useState(initProject);
  const createProject = (project:Project) => dispatch(createProjectAction(project));

  const end = (page: CurrentPage) => {
    if (page === CurrentPage.END) {
      createProject(newProject);
    }
    setCurrentPage(page);
  };
  const handleChangeValue = (name: ProjectKeys, value: any) => {
    setNewProject({ ...newProject, [name]: value });
  };

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
      return <Team changePage={setCurrentPage} currentPage={currentPage} />;
    case CurrentPage.FUNDING:
      return (
        <Funding
          changePage={setCurrentPage}
          goal={newProject.goal}
          currentPage={currentPage}
          onChangeValue={handleChangeValue}
        />
      );
    case CurrentPage.SETTINGS:
      return (
        <Settings
          changePage={end}
          onChangeValue={handleChangeValue}
          currentPage={currentPage}
          region={newProject.region}
        />
      );
    default:
      return null;
  }
};

export default CreateProject;
