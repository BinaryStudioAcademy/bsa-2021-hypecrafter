import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { ActionType } from '../../common/enums';
import { Comment } from '../../data/entities';
import { CommentRepository, ProjectRepository } from '../../data/repositories';

export default class CategoryService {
  readonly #commentRepository: CommentRepository;

  readonly #projectRepository: ProjectRepository;

  readonly #app: MicroMq;

  constructor(commentRepository: CommentRepository, projectRepository: ProjectRepository, app: MicroMq) {
    this.#commentRepository = commentRepository;
    this.#app = app;
    this.#projectRepository = projectRepository;
  }

  public async createComment(body: Comment) {
    const newComment = await this.#commentRepository.save({
      ...new Comment(),
      ...body
    });

    const { author: userId, project: projectId } = body;

    const CommentedProject = await this.#projectRepository.getProjectById(projectId as any);
    const { authorId: recipient } = CommentedProject;

    await this.#app.ask(Project.NOTIFICATION, {
      server: {
        action: ActionType.COMMENT,
        meta: {
          userId,
          projectId,
          recipient
        },
      },
    });

    const comment = await this.#commentRepository.getById(newComment.id);
    return comment;
  }
}
