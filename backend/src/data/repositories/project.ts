import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  #limit = 3;

  public getPopular() {
    return this.createQueryBuilder('project')
      .select(`amount as donated,
      description,
      project.name as "name",
      project."id",
      goal,
      category.name as "category",
      array_to_string(array_agg(tag.name),', ') as "tags"
      `)
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .groupBy(`project."id", donated,
      description,
      project.name,
      project."id",
      goal,
      category.name `)
      .orderBy('project."totalInteractionTime"/project."totalViews"/project."minutesToRead"', 'DESC')
      .limit(this.#limit)
      .execute();
  }

  public getRecommended() {
    return this.createQueryBuilder('project')
      .select(`
      amount as donated,
      description,
      project.name as "name",
      project."id",
      goal,
      category.name as "category",
      array_to_string(array_agg(tag.name),', ') as "tags"
      `)
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .groupBy(`
      project."id", 
      donated,
      description,
      project.name,
      project."id",
      goal,
      category.name `)
      .orderBy('project."updatedAt"', 'DESC')
      .limit(this.#limit)
      .execute();
  }
}

