/* eslint-disable class-methods-use-this */
/* eslint-disable default-case */
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  public async getById(id: string) {
    const comment = await this.createQueryBuilder('comment')
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
            'id', comment.id,
            'message', comment.message,
            'createdAt', comment."createdAt",
            'updatedAt', comment."updatedAt",
            'parentCommentId', comment."parentCommentId"
          )
        ) AS "comments"      
        `
      )
      .leftJoin('comment.author', 'commentAuthor')
      .leftJoin(
        'donate',
        'userDonates',
        '"userDonates"."projectId"=comment."projectId" AND "userDonates"."userId"="commentAuthor"."id"'
      )
      .leftJoin('comment.project', 'project')
      .leftJoin('project.team', 'team')
      .leftJoin(
        'team_users',
        'tu',
        'tu."teamId"=team."id" AND "tu"."userId"="commentAuthor"."id"'
      )
      .where({ id })
      .execute();
    return comment[0];
  }
}
