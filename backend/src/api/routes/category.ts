import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ categoryService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => categoryService.getAll()));

export default init;
