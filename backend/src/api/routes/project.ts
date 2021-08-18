import MicroMq from 'micromq';
import { Project, ProjectItem } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app

  .get(path, wrap(() => projectService.getPopularAndRecommended()))
  .get(
    `${path}/popular`,
    wrap<Empty, ProjectItem, { category: string }, Empty>((req) => projectService
      .getPopularProjectsByCategory(req.query.category))
  )
  .get(`${path}/:id`, wrap<Empty, Project, { id: string }, Empty>((req) => projectService.getById(req.params.id)));

export default init;
