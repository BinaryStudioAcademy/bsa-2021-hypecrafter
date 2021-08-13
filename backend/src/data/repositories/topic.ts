import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class TopicRepository extends Repository<Project> {
  public getAll() {
    return this.query(`
      SELECT 
        category.id, 
        category.name, 
        SUM(amount) 
      FROM project
      LEFT JOIN donate ON donate."projectId" = project."id"
      RIGHT JOIN category ON project."categoryId" = category.id
      GROUP BY category.id, category.name
    `);
  }
}
