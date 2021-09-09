import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { HttpMethod } from '../../common/enums';
import { ActionPath } from '../../common/enums/actionsPath';
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

    const comment = await this.#commentRepository.getById(newComment.id);

    const { response } = (await this.#app.ask(Project.NOTIFICATION, {
      path: ActionPath.CommentNotification,
      method: HttpMethod.POST,
      body: {
        comment,
        data: {
          userId,
          projectId,
          recipient
        }
      }
    })) as { response: Comment };

    return response;
  }
}
