/* eslint-disable class-methods-use-this */
/* eslint-disable default-case */
import { ProjectsCategories, ProjectsFilter, ProjectsSort, TimeInterval } from 'hypecrafter-shared/enums';
import { isNull } from 'lodash';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { timeIntervalForRecommendationSystem } from '../../common/constans';
import { Mark } from '../../common/enums';
import {
  Project as MyProject,
  UpdateViewsAndInteractionTime
} from '../../common/types';
import { Project, UserProfile, UserProject, Donate } from '../entities';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
#projectLimit = 3;

  #chartProjectLimit = 13;

  private getProjectsByOrder(order: string) {
    return this.createQueryBuilder('project')
      .select(
        `
        donated,
        description,
        project.name AS "name",
        project."id",
        goal,
        project.imageUrl,
        category.name AS "category",
        array_agg(tag.name) AS "tags"
      `
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          SUM(amount) AS donated,
          "projectId"
        `
          )
          .from('donate', 'donate')
          .groupBy('"projectId"'),
        'dn',
        'dn."projectId" = project.id'
      )
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
        project.imageUrl,
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
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          SUM(amount) AS donated,
          "projectId"
        `
          )
          .from('donate', 'donate')
          .groupBy('"projectId"'),
        'dn',
        'dn."projectId" = project.id'
      )
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

  public async getById(id: string, userId?: string): Promise<MyProject> {
    let selectQuery = `
      project."id",
      project."imageUrl",
      project."videoUrl",
      project."instagramUrl",
      project."facebookUrl",
      project."dribbleUrl",
      project.content AS story,
      project.totalViews AS totalViews,
      "FAQ",
      donated,
      description,
      category.name AS "category",
      project.name,
      project."finishDate",
      goal,
      tags,
      likes,
      dislikes,
      privileges,
      "projectComments",
      "bakersDonation"
    `;
    if (userId) {
      selectQuery += ', upm.mark, upm."isWatched"';
    }
    const projectQuery = this.createQueryBuilder('project')
      .select(selectQuery)
      .addSelect(subQuery => (
        subQuery
          .select(
            `CASE project.totalViews
              WHEN 0 THEN 0
              ELSE (100 * COUNT(donate.userId)) / project.totalViews
            END`,
            'involvementIndex'
          )
          .where('donate.projectId = :id', { id })
          .from(Donate, 'donate')
      ))
      .addSelect(subQuery => (
        subQuery
          .select('COUNT(donate.userId)', 'bakersAmount')
          .where('donate.projectId = :id', { id })
          .from(Donate, 'donate')
      ))
      .leftJoin(subQuery => subQuery
        .select(`
          SUM(amount) AS donated,
          "projectId"
        `
          )
          .from('donate', 'donate')
          .groupBy('"projectId"'),
        'dn',
        'dn."projectId" = project.id'
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          SUM(CASE user_project.mark WHEN 'like' THEN 1 ELSE 0 END) AS likes,
          SUM(CASE user_project.mark WHEN 'dislike' THEN 1 ELSE 0 END) AS dislikes,
          "projectId"
        `
          )
          .from('user_project', 'user_project')
          .groupBy('"projectId"'),
        'up',
        'up."projectId" = project.id'
      )
      .leftJoin('project.category', 'category')
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          jsonb_agg(
            jsonb_build_object(
              'id', faq.id,
              'question', question,
              'answer', answer
            )
          ) AS "FAQ",
          "projectId"
        `
          )
          .from('faq', 'faq')
          .groupBy('"projectId"'),
        'fq',
        'fq."projectId" = project.id'
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
            jsonb_agg(
              DISTINCT jsonb_build_object(
                'title', title,
                'content', "donatorsPrivilege".content,
                'includes', includes,
                'amount', amount
              )
            ) AS "privileges",
            "bakersDonation",
            project.id AS "projectId"
          `
          )
          .from(Project, 'project')
          .leftJoin(
            (subQuery1) => subQuery1
              .select(
                `
            array_agg(dua."userAmount") AS "bakersDonation",
            dua."projectId"
          `
              )
              .from(
                (subQuery2) => subQuery2
                  .select(
                    `
              SUM(amount) AS "userAmount",
              "userId",
              "projectId"
            `
                  )
                  .from('donate', 'donate').groupBy(`
              "userId",
              "projectId"

            `), 'dua'
              )
              .groupBy('dua."projectId"'), 'ud', 'ud."projectId" = project.id'
          )
          .leftJoin('donators_privilege', 'donatorsPrivilege', 'project.id = "donatorsPrivilege"."projectId"')
          .where(`
          title IS NOT NULL AND
          "donatorsPrivilege".content IS NOT NULL AND
          includes IS NOT NULL AND amount IS NOT NULL
        `)
          .groupBy('project.id,"bakersDonation"'),
        'dp',
        'dp."projectId" = project.id'
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
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
                  'id', comments.id,
                  'message', comments.message,
                  'createdAt', comments."createdAt",
                  'updatedAt', comments."updatedAt",
                  'parentCommentId', comments."parentCommentId"
                )
              ) AS "projectComments",
              project.id AS "projectId"
            `
          )
          .from(Project, 'project')
          .leftJoin('project.comments', 'comments')
          .leftJoin('comments.author', 'commentAuthor')
          .leftJoin(
            (subQuery1) => subQuery1
              .select(
                `
            DISTINCT "userId",
            "projectId"
          `
              )
              .from('donate', 'donate'),
            'userDonates',
            '"userDonates"."projectId"=project."id" AND "userDonates"."userId"="commentAuthor"."id"'
          )
          .leftJoin('project.team', 'team')
          .leftJoin(
            'team_users',
            'tu',
            'tu."teamId" = team."id" AND tu."userId" = "commentAuthor".id'
          )
          .groupBy('project.id'),
        'cp',
        'cp."projectId" = project.id'
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          array_agg(tag.name) AS tags,
          "projectId"
        `
          )
          .from(Project, 'project')
          .leftJoin('project.projectTags', 'projectTags')
          .leftJoin('projectTags.tag', 'tag')
          .groupBy('"projectId"'),
        'tg',
        'tg."projectId" = project.id'
      )
      .where(`project."id" = '${id}'`);

    if (userId) {
      projectQuery.leftJoin(
        (subQuery) => subQuery
          .select(
            `
            mark,
            "isWatched",
            "projectId"
          `
          )
          .from('user_project', 'user_project')
          .where(`"projectId" = '${id}' AND "userId" = '${userId}'`),
        'upm',
        'upm."projectId" = project.id'
      );
    }
    const project = await projectQuery.getRawOne();

    return project;
  }

  public async getForEdit(id: string): Promise<Project> {
    const selectQuery = `
      project."id",
      project."imageUrl",
      project."videoUrl",
      project."instagramUrl",
      project."facebookUrl",
      project."dribbleUrl",
      project.content,
      project.region,
      "FAQ",
      description,
      category.id AS "category",
      project.name,
      project."finishDate",
      project."startDate",
      goal,
      "projectTags",
      "donatorsPrivileges",
      "team"
    `;
    const projectQuery = this.createQueryBuilder('project')
      .select(selectQuery)
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
                'id', "donatorsPrivilege".id,
                'title', title,
                'content', "donatorsPrivilege".content,
                'includes', includes,
                'amount', amount
              )
            ) AS "donatorsPrivileges",
            project.id AS "projectId"
          `)
        .from(Project, 'project')
        .leftJoin('donators_privilege', 'donatorsPrivilege', 'project.id = "donatorsPrivilege"."projectId"')
        .where(`
          title IS NOT NULL AND
          "donatorsPrivilege".content IS NOT NULL AND
          includes IS NOT NULL AND amount IS NOT NULL
        `)
        .groupBy('project.id'), 'dp', 'dp."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
          jsonb_agg(
              jsonb_build_object(
                'id', "projectTags".id,
                'tag', jsonb_build_object(
                  'id', tag.id,
                  'name', tag.name
                )
              )
            )
           AS "projectTags",
          "projectId"
        `)
        .from(Project, 'project')
        .leftJoin('project.projectTags', 'projectTags')
        .leftJoin('projectTags.tag', 'tag')
        .groupBy('"projectId"'), 'tg', 'tg."projectId" = project.id')
      .leftJoin(subQuery => subQuery
        .select(`
          jsonb_build_object(
            'id', team.id,
            'name', team.name,
            'chats', jsonb_agg(
               jsonb_build_object(
                 'id', chats.id,
                 'donator', jsonb_build_object(
                   'id', donator.id,
                   'firstName', donator.firstName,
                   'lastName', donator.lastName,
                   'email', donator.email
                 )
               )
             )
          ) AS "team",
          "projectId"
        `)
        .from('team', 'team')
        .leftJoin('team.chats', 'chats')
        .leftJoin('chats.donator', 'donator')
        .groupBy('"projectId", team.id'), 'te', 'te."projectId" = project.id')
      .where(`project."id" = '${id}'`);
    const project = await projectQuery.getRawOne();

    return project;
  }

  public async setReaction(isLiked: boolean, user: UserProfile, project: Project) {
    const userProject = await getRepository(UserProject)
      .createQueryBuilder('userProject')
      .select('id')
      .where(`"userId" = '${user.id}' AND "projectId" = '${project.id}'`)
      .getRawOne();

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

  public async setWatch(
    isWatched: boolean,
    user: UserProfile,
    project: Project
  ) {
    const userProject = await getRepository(UserProject)
      .createQueryBuilder('userProject')
      .select('id')
      .where(`"userId" = '${user.id}' AND "projectId" = '${project.id}'`)
      .getRawOne();

    let newUserProject;
    if (userProject) {
      newUserProject = {
        ...new UserProject(),
        project,
        user,
        isWatched,
        id: userProject.id
      };
    } else {
      newUserProject = {
        ...new UserProject(),
        project,
        user,
        isWatched
      };
    }
    return Object.assign(new UserProject(), newUserProject).save();
  }

  public getLikesAndDislikesAmount(projectId: string) {
    return this.createQueryBuilder('project')
      .select('likes,dislikes')
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
          SUM(CASE user_project.mark WHEN 'like' THEN 1 ELSE 0 END) AS likes,
          SUM(CASE user_project.mark WHEN 'dislike' THEN 1 ELSE 0 END) AS dislikes,
          "projectId"
        `
          )
          .from('user_project', 'user_project')
          .groupBy('"projectId"'),
        'up',
        'up."projectId" = project.id'
      )
      .where(`project."id" = '${projectId}'`)
      .getRawOne();
  }

  public getBySortAndFilter({ sort, filter, categories, userId, upcoming }: {
    sort: ProjectsSort;
    filter: ProjectsFilter;
    categories: ProjectsCategories[];
    userId?: string;
    upcoming: boolean;
  }) {
    const query = this.createQueryBuilder('project')
      .select(
        `
        donated,
        description,
        project.totalViews AS totalViews,
        CASE project.totalViews
          WHEN 0 THEN 0
          ELSE (100 * "bakersAmount") / project.totalViews
        END AS "involvementIndex",
        project.name AS "name",
        project."id",
        project."imageUrl",
        goal,
        category.name AS "category",
        tags
        ${
  userId
    ? `,
        CASE WHEN up."isFavorite" IS NULL THEN false ELSE true END AS "isFavorite",
        CASE WHEN dnu."projectId" IS NULL THEN false ELSE true END AS "isDonated"
        ` : ''}
      `)
      .leftJoin('project.category', 'category')
      .leftJoin(subQuery => subQuery
        .select(`
          SUM(amount) AS donated,
          COUNT("userId") AS "bakersAmount",
          "projectId"
        `
          )
          .from('donate', 'donate')
          .groupBy('"projectId"'),
        'dn',
        'dn."projectId" = project.id'
      )
      .leftJoin('project.category', 'category')
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
            array_agg(tag.name) AS "tags",
            "projectId"
          `
          )
          .from(Project, 'project')
          .leftJoin('project.projectTags', 'projectTags')
          .leftJoin('projectTags.tag', 'tag')
          .groupBy('"projectId"'),
        'tg',
        'tg."projectId" = project.id'
      );

    if (userId) {
      query
        .leftJoin(
          (subQuery) => subQuery
            .select(
              `
          project.id AS "projectId",
          "userId",
          "isFavorite"
        `
            )
            .from(Project, 'project')
            .leftJoin('project.userProjects', 'userProject')
            .where(`"userProject"."userId" = '${userId}'`),
          'up',
          'up."projectId" = project.id'
        )
        .leftJoin(
          (subQuery) => subQuery
            .select('DISTINCT "projectId"')
            .from('donate', 'donate')
            .where(`donate."userId" = '${userId}'`),
          'dnu',
          'dnu."projectId" = project.id'
        );
    }

    const categoriesCondition = this.getCategoryFilterCondition(categories);
    query.where(categoriesCondition);

    if (userId) {
      const filterCondition = this.getFilterCondition(filter, userId);
      query.andWhere(filterCondition);
    }

    if (upcoming) {
      query.andWhere('project."finishDate" BETWEEN current_date AND current_date + 7');
    }

    const orderBy = this.getOrderBy(sort);
    query.orderBy(orderBy);

    return query.execute();
  }

  // eslint-disable-next-line consistent-return
  private getOrderBy(sort: ProjectsSort) {
    switch (sort) {
      case ProjectsSort.NAME:
        return 'project."name"';
      case ProjectsSort.DATE:
        return 'project."createdAt"';
      case ProjectsSort.POPULAR:
        return 'project."totalInteractionTime"/project."totalViews"/project."minutesToRead"';
      case ProjectsSort.RECOMMENDED:
        return 'RANDOM()';
    }
  }

  // eslint-disable-next-line consistent-return
  private getFilterCondition(filter: ProjectsFilter, userId: string) {
    switch (filter) {
      case ProjectsFilter.ALL:
        return 'project."id" IS NOT NULL';
      case ProjectsFilter.FAVORITE:
        return '"isFavorite" = true';
      case ProjectsFilter.INVESTED:
        return 'dnu."projectId" IS NOT NULL';
      case ProjectsFilter.OWN:
        return `up."userId" = '${userId}'`;
    }
  }

  // eslint-disable-next-line consistent-return
  private getCategoryFilterCondition(categories: ProjectsCategories[]): string {
    if (categories.length === 0) {
      return 'project."id" IS NOT NULL';
    }
    return categories.map(category => `category.name = '${category}'`).join(' OR ');
  }

  public getViewsAndInteractionTimeById(id: string) {
    return this.createQueryBuilder('project')
      .select('project.totalViews', 'totalViews')
      .addSelect('project.totalInteractionTime', 'totalInteractionTime')
      .where('project.id = :id', { id })
      .getRawOne();
  }

  public async updateViewsAndInteractionTimeById(id: string, data: UpdateViewsAndInteractionTime) {
    await this.update(id, data);

    return this.createQueryBuilder('project')
      .select('project.totalViews', 'totalViews')
      .addSelect(subQuery => (
        subQuery
          .select('COUNT(donate.userId)', 'bakersAmount')
          .where('donate.projectId = :id', { id })
          .from(Donate, 'donate')
      ))
      .addSelect(subQuery => (
        subQuery
          .select(
            `CASE project.totalViews
              WHEN 0 THEN 0
              ELSE (100 * COUNT(donate.userId)) / project.totalViews
            END`,
            'involvementIndex'
          )
          .where('donate.projectId = :id', { id })
          .from(Donate, 'donate')
      ))
      .where('project.id = :id', { id })
      .getRawOne();
      
  // eslint-disable-next-line consistent-return
  public getDonationInformationDuringTime(id: string, timeInterval: TimeInterval) {
    const date = new Date();
    switch (timeInterval) {
      case TimeInterval.Day: {
        date.setDate(date.getDate() - 1);
        return this.getDonationInformation(id, date);
      }
      case TimeInterval.Month: {
        date.setMonth(date.getMonth() - 1);
        return this.getDonationInformation(id, date);
      }
      case TimeInterval.Year: {
        date.setFullYear(date.getFullYear() - 1);
        return this.getDonationInformation(id, date);
      }
      case TimeInterval.AllTime: {
        return this.getDonationInformation(id, null);
      }
    }
  }

  public async getProjectStatistics(id: string) {
    const query = this.createQueryBuilder('project')
      .select(
        `
          "totalViews",
          "minutesToRead",
          "totalInteractionTime"
        `
      )
      .where({ id });

    const res = await query.getRawOne();
    return res;
  }

  private async getDonationInformation(id: string, startDate: Date | null) {
    const query = this.createQueryBuilder('project')
      .select(
        `
          id,
          donated,
          "donationCreatedAt",
          "firstName",
          "lastName"
        `
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
              amount AS donated,
              "createdAt" as "donationCreatedAt",
              "projectId",
              "firstName",
              "lastName"
            `
          )
          .from('donate', 'donate')
          .leftJoin(
            (subQuery2) => subQuery2
              .select(
                `
                  id as "userId",
                  "firstName",
                  "lastName"
                `
              )
              .from('user_profile', 'user_profile'),
            'test',
            'test."userId" = donate.user.id'
          ),
        'dn',
        'dn."projectId" = project.id'
      );

    let fullQuery;

    if (startDate) {
      fullQuery = query.where('"donationCreatedAt" > :start_at AND id=:id', {
        id,
        start_at: startDate
      });
    } else {
      fullQuery = query.where({ id });
    }

    const res = fullQuery.execute();
    return res;
  }

  public getRecommendation(
    region?: string,
    projectTags?: string[],
    category?: string
  ) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - timeIntervalForRecommendationSystem);
    const stringValue = projectTags ? projectTags.join(',') : null;

    const query = this.createQueryBuilder('project')
      .select(
        `
          project."id" AS id,
          project.name as name,
          "totalInteractionTime",
          "totalViews",
          donated,
          category.name AS "categoryName",
          region,
          goal,
          project."createdAt",
          tags,
          likes,
          dislikes,
          project."imageUrl",
          project."isActive",
          CASE 
            WHEN project."isActive" IS FALSE AND donated - goal <= 0
              THEN true
            WHEN project."isActive" IS FALSE AND donated - goal > 0
              THEN false
            ELSE
              null
            END AS "isSuccess"
        `
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
              SUM(amount) AS donated,
              "projectId"
            `
          )
          .from('donate', 'donate')
          .groupBy('"projectId"'),
        'dn',
        'dn."projectId" = project.id'
      )
      .leftJoin('project.category', 'category')
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
              array_agg(tag.name) AS tags,
              "projectId"
            `
          )
          .from(Project, 'project')
          .leftJoin('project.projectTags', 'projectTags')
          .leftJoin('projectTags.tag', 'tag')
          .groupBy('"projectId"'),
        'tg',
        'tg."projectId" = project.id'
      )
      .leftJoin(
        (subQuery) => subQuery
          .select(
            `
              SUM(CASE user_project.mark WHEN 'like' THEN 1 ELSE 0 END) AS likes,
              SUM(CASE user_project.mark WHEN 'dislike' THEN 1 ELSE 0 END) AS dislikes,
              "projectId"
            `
          )
          .from('user_project', 'user_project')
          .groupBy('"projectId"'),
        'userpr',
        'userpr."projectId" = project.id'
      )
      .where(
        `
          project."createdAt" > :start_at
          ${stringValue ? `AND ARRAY['${stringValue}'] && tags` : ''} 
          ${category ? `AND category.name='${category}'` : ''} 
          ${region ? `AND project.region='${region}'` : ''}
        `,
        {
          start_at: date
        }
      );

    return query.execute();
  }
}
