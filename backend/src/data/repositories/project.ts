import { EntityRepository, Repository } from 'typeorm';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  #projectLimit = 3;

  private getProjectsByOrder(order: string) {
    return this.createQueryBuilder('project')
      .select(`
        amount AS donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        array_agg(tag.name) AS "tags"
      `)
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .groupBy(`
        donated,
        description,
        project.name,
        project."id",
        goal,
        category.name
      `)
      .orderBy(order, 'DESC')
      .limit(this.#projectLimit)
      .execute();
  }

  public getPopular() {
    return this.getProjectsByOrder('project."totalInteractionTime"/project."totalViews"/project."minutesToRead"');
  }

  public getRecommended() {
    return this.getProjectsByOrder('project."updatedAt"');
  }

  public getById(id: string) {
    return this.createQueryBuilder('project')
      .select(`
        project."id",
        project."imageUrl",
        project."instagramUrl",
        project."facebookUrl",
        project."dribbleUrl",
        donated,
        description,
        category.name AS "category",
        project.name,
        project."finishDate",
        goal,
        array_agg(tag.name) AS "tags",
        "bakersAmount",
        likes,
        dislikes
      `)
      .leftJoin(subQuery => subQuery
        .select(`
          SUM(amount) AS donated,
          COUNT(DISTINCT "userId") AS "bakersAmount",
          "projectId"
        `)
        .from('donate', 'donate')
        .groupBy('"projectId"'), 'dn', 'dn."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
          SUM(CASE user_project.mark WHEN 'like' THEN 1 ELSE 0 END) AS likes,
          SUM(CASE user_project.mark WHEN 'dislike' THEN 1 ELSE 0 END) AS dislikes,
          "projectId"
        `)
        .from('user_project', 'user_project')
        .groupBy('"projectId"'), 'up', 'up."projectId" = project.id')
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .where(`project."id" = '${id}'`)
      .groupBy(`
        project."id", 
        donated, 
        "bakersAmount",
        likes,
        dislikes,
        category.name
      `)
      .execute();
  }
}

