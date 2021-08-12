import { Topic } from '../../common/types';

const mapTopics = (res: Topic[]) => res.map((it) => ({ ...it, sum: Math.max(0, it.sum) }));

export { mapTopics };
