import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createProjectAction } from './actions';
import { Project } from '../../common/types/project';
import { CurrentPage } from './enums';
import Basic from './components/Basic';
import BeforeStart from './components/BeforeStart';

import classes from './styles.module.scss';

const CreateProject = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(CurrentPage.BEFORE_START);
  const createProject = (project:Project) => dispatch(createProjectAction(project));
  const newProject: Project = {
    id: '',
    category: '',
    description: '',
    donated: 0,
    goal: 0,
    imageUrl: '',
    name: '',
    tags: [],
    url: ''
  };
  switch (currentPage) {
    case CurrentPage.BEFORE_START:
      return <BeforeStart changePage={setCurrentPage} />;
    case CurrentPage.BASIC:
      return <Basic changePage={setCurrentPage} />;
    default:
      return <BeforeStart changePage={setCurrentPage} />;
  }
};

export default CreateProject;
