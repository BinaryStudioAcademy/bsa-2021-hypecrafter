import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Project } from '../../common/types/project';
import { createProjectAction } from './actions';
import Basic from './components/Basic';
import BeforeStart from './components/BeforeStart';
import Funding from './components/Funding';
import Story from './components/Story';
import Team from './components/Team';
import { CurrentPage, ProjectKeys } from './enums';

// import classes from './styles.module.scss';

const CreateProject = () => {
  const initProject: Project = {
    description: 'test description',
    donated: 0,
    goal: 10,
    imageUrl: '',
    name: 'test name',
    tags: [],
    url: '',
    totalViews: 10,
    minutesToRead: 10,
    region: 'test region',
    totalInteractionTime: 10,
    startDate: '2021-08-21 10:10:10',
    finishDate: '2021-08-21 10:10:10'
  };
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(CurrentPage.BASIC);

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
        />
      );
    case CurrentPage.STORY:
      return <Story changePage={setCurrentPage} currentPage={currentPage} />;
    case CurrentPage.TEAM:
      return <Team changePage={setCurrentPage} currentPage={currentPage} />;
    case CurrentPage.FUNDING:
      return <Funding changePage={end} currentPage={currentPage} />;
    default:
      return <BeforeStart changePage={setCurrentPage} currentPage={currentPage} />;
  }
};

export default CreateProject;
