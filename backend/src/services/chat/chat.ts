import { Message } from '../../data/entities';
import { MessageRepository } from '../../data/repositories';

export default class ChatService {
  readonly #messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.#messageRepository = messageRepository;
  }

  public async getMessages() {
    return this.#messageRepository.getAll();
  }

  public async createMessage(data: { authorId: string, chatId: string, text: string }) {
    const newMessage = await this.#messageRepository.save({
      ...new Message(),
      ...data
    });

    return newMessage;
  }
}
