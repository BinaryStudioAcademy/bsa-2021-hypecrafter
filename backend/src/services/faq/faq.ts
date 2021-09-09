import { FAQRepository } from '../../data/repositories';

interface FAQ{
  id?: string;
  question: string;
  answer: string;
}
export default class FAQServise {
  readonly #faqRepository: FAQRepository;

  constructor(faqRepository: FAQRepository) {
    this.#faqRepository = faqRepository;
  }

  public save(faqs:FAQ[]) {
    return this.#faqRepository.save(faqs);
  }
}
