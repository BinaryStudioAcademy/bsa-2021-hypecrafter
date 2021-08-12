import MicroMq from 'micromq';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ topicService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => topicService.getAll()));

export default init;
