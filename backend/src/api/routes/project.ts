import MicroMq from 'micromq';
import { ProjectItem } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(
    path,
    wrap(() => projectService.getPopularAndRecommended())
  )
  .get(
    `${path}/popular`,
    wrap<Empty, ProjectItem, { category: string }, Empty>((req) => projectService
      .getPopularProjectsByCategory(req.query.category))
  );

export default init;
