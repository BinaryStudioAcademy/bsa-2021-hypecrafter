import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createProjectAction } from './actions';
import { Project } from '../../common/types/project';
import Layout from './components/Layout';
import { CurrentPage } from './enums';

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

  return (
    <Layout currentPage={currentPage} onChangePage={setCurrentPage} />
  );
};

export default CreateProject;
