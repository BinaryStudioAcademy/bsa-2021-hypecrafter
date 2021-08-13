/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Connection } from 'typeorm';
import { Mark } from '../../common/enums';
import { Category, UserProfile, Project, UserProject } from '../entities';

import userProjectData from '../seed-data/userProjectData.json';

const projectData = async (connection: Connection) => {
  const categoryRepository = connection.getRepository(Category);
  const userProfileRepository = connection.getRepository(UserProfile);
  const projectRepository = connection.getRepository(Project);
  const userProjectRepository = connection.getRepository(UserProject);

  const categories = await categoryRepository.find();

  for (const { user, project: data } of userProjectData) {
    const { category: categoryName, ...project } = data;
    const category = categories.find(
      ({ name }: { name: string }) => name === categoryName
    );

    const newProject = { ...new Project(), ...project, category };
    await projectRepository.save(newProject);

    const newUser = { ...new UserProfile(), ...user };
    await userProfileRepository.save(newUser);

    const newUserProject = {
      ...new UserProject(),
      project: newProject,
      user: newUser,
      IsWatched: true,
      mark: Mark.like
    };
    await userProjectRepository.save(newUserProject);
  }
};

export default projectData;
