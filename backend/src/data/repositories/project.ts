/* eslint-disable class-methods-use-this */
/* eslint-disable default-case */
import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
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
        privileges
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
        .where(`"userProject"."userId" = ${userId}`),
      'up',
      'up."projectId" = project.id');
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
