import { EntityRepository, Repository } from 'typeorm';
import { ProjectTag } from '../entities';

@EntityRepository(ProjectTag)
export class ProjectTagRepository extends Repository<ProjectTag> {
}
