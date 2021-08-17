import { mapTopics } from '../../data/mappers';
import { TopicRepository } from '../../data/repositories';

export default class TopicService {
  readonly #topicRepository: TopicRepository;

  constructor(topicRepository: TopicRepository) {
    this.#topicRepository = topicRepository;
  }

  public async getAll() {
    const topics = await this.#topicRepository.getAll();

    return mapTopics(topics);
  }
}
