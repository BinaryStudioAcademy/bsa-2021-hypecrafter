import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { Project } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  // eslint-disable-next-line arrow-body-style
  .get(path, wrap<Empty, Project, { sort: ProjectsSort; filter: ProjectsFilter }, Empty>((req) => {
    return projectService.getBySortAndFilter({ sort: req.query.sort, filter: req.query.filter });
  }))
  .get(`${path}/popular-and-recommended`, wrap(() => projectService.getPopularAndRecommended()))
  .get(`${path}/:id`, wrap<Empty, Project, { id: string }, Empty>((req) => projectService.getById(req.params.id)));

export default init;
