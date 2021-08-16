import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ projectService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => projectService.getPopularAndRecommended()));

export default init;
