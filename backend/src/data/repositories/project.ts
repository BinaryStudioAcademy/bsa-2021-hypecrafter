import { EntityRepository, Repository } from 'typeorm';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  #projectLimit = 3;

  #chartProjectLimit = 13;

  private getProjectsByOrder(order: string) {
    return this.createQueryBuilder('project')
      .select(
        `
        amount AS donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        array_to_string(array_agg(tag.name),', ') AS "tags"
      `
      )
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .groupBy(
        `
        project."id", 
        donated,
        description,
        project.name,
        project."id",
        goal,
        category.name
      `
      )
      .orderBy(order, 'DESC')
      .limit(this.#projectLimit)
      .execute();
  }

  public getPopularProjectsByCategory(category: string) {
    return this.createQueryBuilder('project')
      .select(
        `
        amount AS donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        array_to_string(array_agg(tag.name),', ') AS "tags",
        project."totalViews" AS "views" 
      `
      )
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .groupBy(
        `
        project."id", 
        donated,
        description,
        project.name,
        project."id",
        goal,
        category.name,
        views
      `
      )
      .where(`"category"."name"='${category}'`)
      .orderBy('"views"', 'DESC')
      .limit(this.#chartProjectLimit)
      .execute();
  }

  public getPopular() {
    return this.getProjectsByOrder(
      'project."totalInteractionTime"/project."totalViews"/project."minutesToRead"'
    );
  }

  public getRecommended() {
    return this.getProjectsByOrder('project."updatedAt"');
  }
}
