/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { getCustomRepository } from 'typeorm';
import { Mark } from '../../common/enums';
import {
  CategoryRepository,
  UserProfileRepository,
  ProjectRepository,
  UserProjectRepository
} from '../repositories';

import userProjectData from '../seed-data/userProjectData.json';

const projectData = async () => {
  const categories = await getCustomRepository(CategoryRepository).getAll();

  for (const { user, project: data } of userProjectData) {
    const { category, ...project } = data;
    const { id: categoryId } = categories.find(
      ({ name }: { name: string }) => name === category
    );

    const { id: projectId } = await getCustomRepository(
      ProjectRepository
    ).addProject({
      categoryId,
      ...project
    });

    const { id: userId } = await getCustomRepository(
      UserProfileRepository
    ).addUser({ ...user });

    await getCustomRepository(UserProjectRepository).addUserProject({
      userId,
      projectId,
      IsWatched: true,
      mark: Mark.like
    });
  }
};

export default projectData;
