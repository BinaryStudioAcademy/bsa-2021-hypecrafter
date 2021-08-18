import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ tagService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => tagService.getPopular()));

export default init;
