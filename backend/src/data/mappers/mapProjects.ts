import { Project } from '../../common/types';
import { mapBoolean } from './mapBoolean';

const mapProjects = (res: Project[]) => res.map((it) => ({ ...it, tags: mapBoolean(it.tags) }));

export { mapProjects };
