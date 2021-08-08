/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { getCustomRepository } from 'typeorm';
import { Mark } from '../../common/enums';
import { Project, UserProfile, UserProject } from '../entities';
import {
  CategoryRepository
} from '../repositories';

import userProjectData from '../seed-data/userProjectData.json';

const projectData = async () => {
  const categories = await getCustomRepository(CategoryRepository).getAll();

  for (const { user, project: data } of userProjectData) {
    const { category: categoryName, ...project } = data;
    const category = categories.find(
      ({ name }: { name: string }) => name === categoryName
    );

    // const { id: projectId } = await getCustomRepository(
    //   ProjectRepository
    // ).addProject({
    //   category: Object.assign(new Category(), category),
    //   ...Object.assign(new Project(), project)
    // } as any);
    const newProject = await Object.assign(new Project(), {
      ...project,
      category
    }).save();

    // const { id: userId } = await getCustomRepository(
    //   UserProfileRepository
    // ).addUser({ ...user });
    const newUser = await Object.assign(new UserProfile(), {
      ...user
    }).save();

    await Object.assign(new UserProject(), {
      user: newUser,
      project: newProject,
      IsWatched: true,
      mark: Mark.like
    }).save();
    // await getCustomRepository(UserProjectRepository).addUserProject({
    //   user
    //   IsWatched: true,
    //   mark: Mark.like
    // });
  }
};

export default projectData;
