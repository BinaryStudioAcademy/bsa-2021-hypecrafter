import { Job } from '../../common/types';
import { JobRepository } from '../../data/repositories';

export default class JobService {
  readonly #jobRepository: JobRepository;

  constructor(jobRepository: JobRepository) {
    this.#jobRepository = jobRepository;
  }

  public getAll() {
    return this.#jobRepository.getAll();
  }

  public getById(id: string) {
    return this.#jobRepository.getById(id);
  }

  public createJob(data: Job) {
    return this.#jobRepository.createJob(data);
  }

  public deleteByProjectId(projectId: string) {
    return this.#jobRepository.deleteByProjectId(projectId);
  }
}
