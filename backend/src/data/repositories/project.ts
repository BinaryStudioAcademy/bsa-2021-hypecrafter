/* eslint-disable class-methods-use-this */
/* eslint-disable default-case */
import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { isNull } from 'lodash';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Mark } from '../../common/enums';
import { Project as MyProject } from '../../common/types';
import { Project, UserProfile, UserProject } from '../entities';

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
        donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        array_to_string(array_agg(tag.name),', ') AS "tags",
        project."totalViews" AS "views"
      `
      )
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
      .groupBy(
        `
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

  public async getById(id: string, userId: string | undefined): Promise<MyProject> {
    let selectQuery = `
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
    `;
    if (userId) {
      selectQuery += ', upm.mark';
    }
    const projectQuery = this.createQueryBuilder('project')
      .select(selectQuery)
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
            project.id AS "projectId"
          `)
        .from(Project, 'project')
        .leftJoin(subQuery1 => subQuery1
          .select(`
            array_agg(dua."userAmount") AS "bakersDonation", 
            dua."projectId"
          `)
          .from(subQuery2 => subQuery2
            .select(`
              SUM(amount) AS "userAmount",
              "userId", 
              "projectId"
            `)
            .from('donate', 'donate')
            .groupBy(`
              "userId", 
              "projectId"
            `), 'dua')
          .groupBy('dua."projectId"'), 'ud', 'ud."projectId" = project.id')
        .leftJoin('project.projectDonatorsPrivileges', 'projectDonatorsPrivileges')
        .leftJoin('projectDonatorsPrivileges.donatorsPrivilege', 'donatorsPrivilege')
        .where('privilege IS NOT NULL AND amount IS NOT NULL')
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
        .leftJoin('donate', 'userDonates',
          '"userDonates"."projectId"=project."id" AND "userDonates"."userId"="commentAuthor"."id"')
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
      .where(`project."id" = '${id}'`);

    if (userId) {
      projectQuery
        .leftJoin(subQuery => subQuery
          .select(`
          mark,
          "projectId"
        `)
          .from('user_project', 'user_project')
          .where(`"projectId" = '${id}' AND "userId" = '${userId}'`), 'upm', 'upm."projectId" = project.id');
    }
    const project = await projectQuery.getRawOne();

    return project;
  }

  public async setReaction(isLiked: boolean, userId: string, projectId: string) {
    const userProject = await getRepository(UserProject)
      .createQueryBuilder('userProject')
      .select(`
        id
      `)
      .where(`"userId"='${userId}' AND "projectId"='${projectId}'`)
      .getRawOne();

    const project = await getRepository(Project).findOne({ id: projectId });
    const user = await getRepository(UserProfile).findOne({ id: userId });
    let mark;
    if (isNull(isLiked)) {
      mark = isLiked;
    } else {
      mark = isLiked ? Mark.like : Mark.dislike;
    }
    let newUserProject;
    if (userProject) {
      newUserProject = {
        ...new UserProject(),
        project,
        user,
        mark,
        id: userProject.id
      };
    } else {
      newUserProject = {
        ...new UserProject(),
        project,
        user,
        mark
      };
    }
    return Object.assign(new UserProject(), newUserProject).save();
  }

  public getBySortAndFilter({ sort, filter, }: { sort: ProjectsSort; filter: ProjectsFilter; }) {
    const userId = "'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529'"; // hardcoded data
    const orderBy = this.getOrderBy(sort);
    const filterCondition = this.getFilterCondition(filter, userId);
    const query = this.createQueryBuilder('project')
      .select(`
        amount AS donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        category.name AS "category",
        tags,
        up."isFavorite"
      `)
      .leftJoin('project.donates', 'donate')
      .leftJoin('project.category', 'category')
      .leftJoin(
        (subQuery) => subQuery
          .select(`
            array_agg(tag.name) AS "tags",
            "projectId"
          `)
          .from(Project, 'project')
          .leftJoin('project.projectTags', 'projectTags')
          .leftJoin('projectTags.tag', 'tag')
          .groupBy('"projectId"'),
        'tg',
        'tg."projectId" = project.id'
      );

    if (userId) {
      query.leftJoin(subQuery => subQuery
        .select(`
          project.id AS "projectId",
          "userId",
          "isFavorite"
        `)
        .from(Project, 'project')
        .leftJoin('project.userProjects', 'userProject')
        .where(`"userProject"."userId" = ${userId}`), 'up', 'up."projectId" = project.id');
    }

    if (filter) {
      query.where(filterCondition);
    }

    if (sort) {
      query.orderBy(orderBy);
    }

    return query.execute();
  }

  // eslint-disable-next-line consistent-return
  private getOrderBy(sort: ProjectsSort) {
    switch (sort) {
      case ProjectsSort.NAME:
        return 'project."name"';
      case ProjectsSort.DATE:
        return 'project."createdAt"';
    }
  }

  // eslint-disable-next-line consistent-return
  private getFilterCondition(filter: ProjectsFilter, userId: string) {
    switch (filter) {
      case ProjectsFilter.ALL:
        return 'project."id" IS NOT NULL';
      case ProjectsFilter.FAVORITE:
        return 'up."isFavorite" = true';
      case ProjectsFilter.INVESTED:
        return 'project."id" IS NOT NULL'; // todo
      case ProjectsFilter.OWN:
        return `up."userId" = ${userId}`;
    }
  }
}
