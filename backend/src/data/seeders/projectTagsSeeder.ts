import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Project } from '../entities/project';
import { ProjectTag } from '../entities/projectTag';
import { Tag } from '../entities/tag';
import { projectTags } from '../seed-data/projectTag';

export default class ProjectTagsSeeder {
  public static async execute() {
    await asyncForEach(async projectTag => {
      const project = await getRepository(Project).findOne({ id: projectTag.projectId });
      const tag = await getRepository(Tag).findOne({ id: projectTag.tagId });

      await Object.assign(new ProjectTag(), {
        ...projectTag,
        project,
        tag
      }).save();
    }, projectTags);
  }
}
