import MicroMq from 'micromq';
// import { InsertResult } from 'typeorm';
import { CreateProject } from '../../data/entities';
import { Project } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => projectService.getPopularAndRecommended()))
  .put(path, wrap<Empty, CreateProject, CreateProject, Empty>((req) => projectService.createProject(req.body)))
  .get(`${path}/:id`, wrap<Empty, Project, { id: string }, Empty>((req) => projectService.getById(req.params.id)));

export default init;
