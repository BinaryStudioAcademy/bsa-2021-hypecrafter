import { Project } from '../../common/types';

const mapProjects = (res: Project[]) => res.map((it) => ({ ...it, tags: it.tags.split(',') }));

export { mapProjects };
