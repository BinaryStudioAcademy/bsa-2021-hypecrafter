import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { Comment, Project, UserProfile } from '../entities';
import { comments } from '../seed-data/commentData';

export default class CommentSeeder {
  public static async execute() {
    await asyncForEach(async comment => {
      const project = await getRepository(Project).findOne({ id: comment.projectId });
      const author = await getRepository(UserProfile).findOne({ id: comment.authorId });
      const parentComment = await getRepository(Comment).findOne({ id: comment.parentCommentId });

      await Object.assign(new Comment(), {
        ...comment,
        author,
        project,
        parentComment
      }).save();
    }, comments);
  }
}
