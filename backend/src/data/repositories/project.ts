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
        array_to_string(array_agg(tag.name),', ') AS "tags"
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
      donated,
      description,
      project.name,
      project."finishDate",
      goal,
      array_to_string(array_agg(tag.name),', ') AS "tags",
      "bakersAmount",
      likes,
      dislikes
    `)
      //   .leftJoin(
      //     `SELECT
      // SUM(amount) AS donated,
      // COUNT ( DISTINCT "userId" ) AS "bakersAmount",
      // "projectId"
      // FROM donate GROUP BY "projectId"`, 'dn', 'dn."projectId" = project."id"')
      // .leftJoin(subQuery => subQuery.select(`      SUM(amount) AS donated,
      // COUNT ( DISTINCT "userId" ) AS "bakersAmount",
      // "projectId"`))
      .leftJoin('project.category', 'category')
      .leftJoin('project.projectTags', 'projectTags')
      .leftJoin('projectTags.tag', 'tag')
      .where(`project."id"='${id}'`)
      .groupBy(`
      project."id", 
      likes, 
      dislikes, 
      donated, 
      "bakersAmount"
    `)
      .execute();
    // return this.query(`
    // SELECT
    // project."id",
    // project."imageUrl",
    // donated,
    // description,
    // project.name,
    // project."finishDate",
    // goal,
    // array_to_string(array_agg(tag.name),', ') AS "tags",
    // "bakersAmount",
    // likes,
    // dislikes
    // FROM project
    // LEFT JOIN (
    //   SELECT
    //   SUM(amount) AS donated,
    //   COUNT ( DISTINCT "userId" ) AS "bakersAmount",
    //   "projectId"
    // FROM donate GROUP BY "projectId")
    //    AS dn ON dn."projectId" = project."id"
    // LEFT JOIN(
    //   SELECT
    //   "projectId",
    //   SUM(case user_project.mark when 'like' then 1 else 0 end) AS likes,
    //   SUM(case user_project.mark when 'dislike' then 1 else 0 end) AS dislikes
    //   FROM user_project
    //   GROUP BY user_project."projectId") AS up ON up."projectId"=project."id"
    // LEFT JOIN project_tag ON project_tag."projectId" = project."id"
    // LEFT JOIN tag ON tag."id"=project_tag."tagId"
    // WHERE project."id"='${id}'
    // GROUP BY project."id", likes, dislikes, donated, "bakersAmount"
    // `);
  }
}

