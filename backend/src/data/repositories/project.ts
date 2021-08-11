import { Repository, EntityRepository } from 'typeorm';
import { Project } from '../entities/project';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public getPopular() {
    return this.query(`
    SELECT 
    amount as donated, 
    description, 
    project.name as "name", 
    project."id", 
    goal, 
    category.name as "category",
    array_to_string(array_agg(tag.name),', ') as "tags"
    FROM project
    LEFT JOIN donate ON donate."projectId" = project."id"
  LEFT JOIN category ON project."categoryId" = category.id
  LEFT JOIN project_tag ON project_tag."projectId"=project."id"
  LEFT JOIN tag ON project_tag."tagId"=tag."id"
GROUP BY project."id", donated, 
    description, 
    project.name, 
    project."id", 
    goal, 
    category.name 
  ORDER BY project."totalInteractionTime"/project."totalViews"/project."minutesToRead" DESC
LIMIT 3
    `);
  }

  public getRecommended() {
    return this.query(`
      SELECT 
        amount as donated, 
        description, 
        project.name as "name", 
        project."id", 
        goal, 
        category.name as "category", 
        array_to_string(array_agg(tag.name),', ') as "tags"
      FROM project
      LEFT JOIN donate ON donate."projectId" = project."id"
      LEFT JOIN category ON project."categoryId" = category.id
      LEFT JOIN project_tag ON project_tag."projectId"=project."id"
      LEFT JOIN tag ON project_tag."tagId"=tag."id"
      GROUP BY project."id", donated, 
    description, 
    project.name, 
    project."id", 
    goal, 
    category.name 
      ORDER BY project."updatedAt" DESC
      LIMIT 3
    `);
  }
}

