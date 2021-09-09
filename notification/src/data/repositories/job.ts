import { EntityRepository, Repository } from 'typeorm';
import { Job as JobData } from '../../common/types';
import { Job } from '../entities/job';

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public createJob(data: JobData) {
    const newJob: Job = Object.assign(new Job(), data);
    return this.save(newJob);
  }

  public deleteByProjectId(projectId: string) {
    return this.findOne({ projectId }).then((job) => this.remove(job));
  }
}
