import { ProjectsFilter, ProjectsSort } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { Project, ProjectItem } from '../../common/types';
import { Project as CreateProject } from '../../data/entities';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .post(path, wrap<Empty, CreateProject, CreateProject, Empty>((req) => projectService.createProject(req.body)))
  .get(path, wrap<Empty, Project, { sort: ProjectsSort; filter: ProjectsFilter }, Empty>(
    (req) => projectService.getBySortAndFilter({ sort: req.query.sort, filter: req.query.filter })
  ))
  .get(`${path}/popular-and-recommended`, wrap(() => projectService.getPopularAndRecommended()))
  .get(
    `${path}/popular`,
    wrap<Empty, ProjectItem, { category: string }, Empty>((req) => projectService
      .getPopularProjectsByCategory(req.query.category))
  )
  .post(
    `${path}/like`,
    wrap<Empty, Project, { isLiked: boolean, projectId: string }, Empty>(
      (req) => projectService.setReaction(req.body, req.headers.userId as string)
    )
  )
  .get(`${path}/:id`, wrap<Empty, Project, { id: string }, Empty>(
    (req) => projectService.getById(req.params.id, req.headers.userId as string)
  ));

export default init;
