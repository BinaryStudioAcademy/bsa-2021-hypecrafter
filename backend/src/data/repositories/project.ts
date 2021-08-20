import { EntityRepository, Repository } from 'typeorm';
import { Project as MyProject } from '../../common/types';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  #projectLimit = 3;

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

  public getPopular() {
    return this.getProjectsByOrder('project."totalInteractionTime"/project."totalViews"/project."minutesToRead"');
  }

  public getRecommended() {
    return this.getProjectsByOrder('project."updatedAt"');
  }

  public async getById(id: string): Promise<MyProject> {
    const project = await this.createQueryBuilder('project')
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
        "projectComments",
        "bakersDonation"
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
              'id', faq.id,
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
              DISTINCT jsonb_build_object(
                'privilege', privilege,
                'amount', amount
              )
            ) AS "privileges",
            "bakersDonation",
            project.id as "projectId"
          `)
        .from(Project, 'project')
        .leftJoin(subQuery => subQuery
          .select(`
            array_agg(dua."userAmount") AS "bakersDonation", 
            dua."projectId"
          `)
          .from(subQuery => subQuery
            .select(`
              SUM(amount) AS "userAmount",
              "userId", 
              "projectId"
            `)
            .from('donate', 'donate')
            .groupBy(`
              "userId", 
              "projectId"
            `), "dua"
          )
          .groupBy('dua."projectId"'), 'ud', 'ud."projectId" = project.id')
        .leftJoin('project.projectDonatorsPrivileges', 'projectDonatorsPrivileges')
        .leftJoin('projectDonatorsPrivileges.donatorsPrivilege', 'donatorsPrivilege')
        .groupBy('project.id,"bakersDonation"'), 'dp', 'dp."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
              jsonb_agg(
                jsonb_build_object(
                  'author', jsonb_build_object(
                      'id', "commentAuthor"."id",
                      'firstName', "commentAuthor"."firstName",
                      'lastName', "commentAuthor"."lastName",
                      'avatar', "commentAuthor"."imageUrl",
                      'isBacker', CASE WHEN "userDonates"."userId" IS NULL THEN false ELSE true END,
                      'isOwner', CASE WHEN tu."userId" IS NULL THEN false ELSE true END
                    ),
                  'message', comments.message,
                  'createdAt', comments."createdAt",
                  'updatedAt', comments."updatedAt",
                  'parentCommentId', comments."parentCommentId"
                )
              ) AS "projectComments",
              project.id AS "projectId"
            `)
        .from(Project, 'project')
        .leftJoin('project.comments', 'comments')
        .leftJoin('comments.author', 'commentAuthor')
        .leftJoin('donate', 'userDonates', '"userDonates"."projectId"=project."id" AND "userDonates"."userId"="commentAuthor"."id"')
        .leftJoin('project.team', 'team')
        .leftJoin('team_users', 'tu', 'tu."teamId"=team."id" AND "tu"."userId"="commentAuthor"."id"')
        .groupBy('project.id'), 'cp', 'cp."projectId" = project.id')
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
    return project[0];
  }
}

