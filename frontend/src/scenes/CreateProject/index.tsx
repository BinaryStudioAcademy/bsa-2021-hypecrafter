import { useDispatch } from 'react-redux';
import { createProjectAction } from './actions';
import { Project } from '../../common/types/project';

import classes from './styles.module.scss';

const CreateProject = () => {
  const dispatch = useDispatch();

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
    <button
      type="button"
      onClick={() => createProject(newProject)}
    >Add Project
    </button>
  );
};

export default CreateProject;
