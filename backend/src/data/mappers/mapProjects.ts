import { Project } from '../../common/types';
import { mapBoolean } from './mapBoolean';
import { nullToNumber } from './nullToNumber';

const mapProjects = (res: Project[]) => res.map((it) => (
  {
    ...it,
    tags: mapBoolean(it.tags),
    involvementIndex: nullToNumber(it.involvementIndex),
    donated: nullToNumber(it.donated),
  }));

export { mapProjects };
