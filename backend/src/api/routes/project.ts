import MicroMq from 'micromq';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => projectService.getPopularAndRecommended()));

export default init;
