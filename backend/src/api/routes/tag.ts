import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ tagService }: Services, path: string) => (app: MicroMq) => app
  .get(`${path}/popular`, wrap(() => tagService.getPopular()))
  .get(path, wrap(() => tagService.getAll()));

export default init;
