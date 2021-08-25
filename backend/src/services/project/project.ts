import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import { Project } from '../../common/types';
import { Chat, Project as CreateProject, ProjectTag, Tag, Team } from '../../data/entities';
import { mapPrivileges, mapProjects } from '../../data/mappers';
import {
  ChatRepository, ProjectRepository, ProjectTagRepository,
  TagRepository, TeamRepository
} from '../../data/repositories';

export default class ProjectService {
  readonly #projectRepository: ProjectRepository;

  readonly #teamRepository: TeamRepository;

  readonly #chatRepository: ChatRepository;

  readonly #projectTagRepository: ProjectTagRepository;

  readonly #tagRepository: TagRepository;

  constructor(projectRepository: ProjectRepository, teamRepository: TeamRepository,
    chatRepository: ChatRepository, projectTagRepository: ProjectTagRepository, tagRepository: TagRepository) {
    this.#projectRepository = projectRepository;
    this.#teamRepository = teamRepository;
    this.#chatRepository = chatRepository;
    this.#projectTagRepository = projectTagRepository;
    this.#tagRepository = tagRepository;
  }

  public async getPopularProjectsByCategory(category: string) {
    const popular = await this.#projectRepository.getPopularProjectsByCategory(category);
    return popular;
  }

  public async getPopularAndRecommended() {
    const popular: Project[] = await this.#projectRepository.getPopular();
    const recommended: Project[] = await this.#projectRepository.getRecommended();

    return {
      popular: mapProjects(popular),
      recommended: mapProjects(recommended)
    };
  }

  public async createProject(body: CreateProject) {
    const project:CreateProject = await this.#projectRepository.save({ ...body });
    const team = await this.#teamRepository.save({ ...new Team(), ...body.team, project });
    this.#chatRepository.save(body.team.chats.map(chat => ({ ...new Chat(), ...chat, team })));
    const listTags = await this.#tagRepository.save(body.projectTags.map(
      _tag => ({ ...new Tag(), name: _tag.tag.name })
    ));
    this.#projectTagRepository.save(listTags.map(_tag => ({ ...new ProjectTag(), tag: _tag, project })));
    return project;
  }

  public async getBySortAndFilter({ sort, filter }: { sort: ProjectsSort, filter: ProjectsFilter }) {
    const projects:Project[] = await this.#projectRepository.getBySortAndFilter({ sort, filter });
    return projects;
  }

  public async getById(id: string) {
    const project = await this.#projectRepository.getById(id);
    project.bakersAmount = Math.max(0, project.bakersAmount);
    project.donated = Math.max(0, project.donated);
    project.privileges = mapPrivileges(project.privileges, project.bakersDonation);
    return project; // rewrite when error handling middleware works
  }
}
