/* eslint-disable class-methods-use-this */
/* eslint-disable default-case */
import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
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
        project."id",
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
