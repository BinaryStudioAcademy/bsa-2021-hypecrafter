import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ topicService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(async () => ({ result : await topicService.getAll() })));

export default init;
