import { Comment } from '../../data/entities';
import { CommentRepository } from '../../data/repositories';

export default class CategoryService {
  readonly #commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.#commentRepository = commentRepository;
  }

  public async createComment(body: Comment) {
    const newComment = await this.#commentRepository.save({
      ...new Comment(),
      ...body
    });
    const comment = await this.#commentRepository.getById(newComment.id);
    return comment;
  }
}
