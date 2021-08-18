import { EntityRepository, Repository } from 'typeorm';
import { Project as MyProject } from '../../common/types';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  #projectLimit = 3;

  #chartProjectLimit = 13;

  private getProjectsByOrder(order: string) {
    return this.createQueryBuilder('project')
      .select(`
        donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        array_agg(tag.name) AS "tags"
      `)
      .leftJoin(subQuery => subQuery
        .select(`
          SUM(amount) AS donated,
          "projectId"
        `)
        .from('donate', 'donate')
        .groupBy('"projectId"'), 'dn', 'dn."projectId" = project.id')
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

  public getById(id: string): Promise<MyProject[]> {
    return this.createQueryBuilder('project')
      .select(`
        project."id",
        project."imageUrl",
        project."instagramUrl",
        project."facebookUrl",
        project."dribbleUrl",
        project.content AS story,
        "FAQ",
        donated,
        description,
        category.name AS "category",
        project.name,
        project."finishDate",
        goal,
        tags,
        "bakersAmount",
        likes,
        dislikes,
        privileges,
        "projectComments"
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
      .leftJoin(subQuery => subQuery
        .select(`
          jsonb_agg(
            jsonb_build_object(
              'id', id,
              'question', question,
              'answer', answer 
            )
          ) AS "FAQ",
          "projectId"
        `)
        .from('faq', 'faq')
        .groupBy('"projectId"'), 'fq', 'fq."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
            jsonb_agg(
              jsonb_build_object(
                'privilege', privilege,
                'amount', amount
              )
            ) AS "privileges",
            "projectId"
          `)
        .from(Project, 'project')
        .leftJoin('project.projectDonatorsPrivileges', 'projectDonatorsPrivileges')
        .leftJoin('projectDonatorsPrivileges.donatorsPrivilege', 'donatorsPrivilege')
        .groupBy('"projectId"'), 'dp', 'dp."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
              jsonb_agg(
                jsonb_build_object(
                  'author', jsonb_build_object(
                      'firstName', "commentAuthor"."firstName",
                      'lastName', "commentAuthor"."lastName"
                    ),
                  'message', comments.message,
                  'createdAt', comments."createdAt",
                  'updatedAt', comments."updatedAt",
                  'parentCommentId', comments."parentCommentId"
                )
              ) AS "projectComments",
              "projectId"
            `)
        .from(Project, 'project')
        .leftJoin('project.comments', 'comments')
        .leftJoin('comments.author', 'commentAuthor')
        .groupBy('"projectId"'), 'cp', 'cp."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
          array_agg(tag.name) AS "tags",
          "projectId"
        `)
        .from(Project, 'project')
        .leftJoin('project.projectTags', 'projectTags')
        .leftJoin('projectTags.tag', 'tag')
        .groupBy('"projectId"'), 'tg', 'tg."projectId" = project.id')
      .where(`project."id" = '${id}'`)
      .execute();
  }
}
