import MicroMq from 'micromq';
import { Services } from '../../services';
import { wrap } from '../../helpers';
import { Project } from '../../data/entities';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => projectService.getPopularAndRecommended()))
  .put(path, wrap<Empty, Project, Project, Empty>((req) => projectService.createProject(req.body)));

export default init;
