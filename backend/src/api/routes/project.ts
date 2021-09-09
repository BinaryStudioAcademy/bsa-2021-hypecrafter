import { ProjectsFilter, ProjectsSort, TimeInterval } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { Project, ProjectItem, RecommendedProjects, Statistics } from '../../common/types';
import { Project as CreateProject } from '../../data/entities';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .post(path, wrap<Empty, CreateProject, CreateProject, Empty>((req) => projectService.createProject(req.body)))
  .get(path, wrap<Empty, Project[], {
    sort: ProjectsSort;
    filter: ProjectsFilter;
    categories: string;
    userId?: string;
  }, Empty>(
    (req) => projectService.getBySortAndFilter({
      sort: req.query.sort,
      filter: req.query.filter,
      stringifiedCategories: req.query.categories,
      userId: req.query.userId,
    })
  ))
  .get(`${path}/popular-and-recommended`, wrap(() => projectService.getPopularAndRecommended()))
  .get(
    `${path}/popular`,
    wrap<Empty, ProjectItem, { category: string }, Empty>((req) => projectService
      .getPopularProjectsByCategory(req.query.category))
  )
  .post(
    `${path}/reaction`,
    wrap<Empty, { likes: number, dislikes: number }, { isLiked: boolean, projectId: string }, Empty>(
      (req) => projectService.setReaction(req.body, req.headers.userId as string)
    )
  )
  .post(
    `${path}/watch`,
    wrap<Empty, { mess: string }, { isWatched: boolean, projectId: string }, Empty>(
      (req) => projectService.setWatch(req.body, req.headers.userId as string)
    )
  )
  .get(
    `${path}/recommendation`,
    wrap<Empty, RecommendedProjects, { projectTagsId?: string, categoryId?: string, region?:string }, Empty>(
      (req) => projectService.getRecommendation({
        stringifiedProjectTags: req.query.projectTagsId,
        region: req.query.region,
        categoryId: req.query.categoryId
      })
    )
  )
  .get(`${path}/:id`, wrap<Empty, Project, { id: string, userId: string | undefined }, Empty>(
    (req) => projectService.getById(req.params.id, req.query.userId)
  ))
  .get(`${path}/:id/statistics`, wrap<Empty, Statistics,
  { id: string, timeInterval: TimeInterval }, Empty>(
    (req) => projectService.getDonationInformation(req.params.id, req.query.timeInterval)
  ))
  .get(`${path}/getForEdit/:id`, wrap<Empty, CreateProject, { id: string, userId: string | undefined }, Empty>(
    (req) => projectService.getForEdit(req.params.id)
  ));

export default init;
