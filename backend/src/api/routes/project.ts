import MicroMq from 'micromq';
// import { InsertResult } from 'typeorm';
import { Project } from '../../data/entities';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => projectService.getPopularAndRecommended()))
  .put(path, wrap<Empty, Project, Project, Empty>((req) => projectService.createProject(req.body)));

export default init;
