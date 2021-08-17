import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { getRepository } from 'typeorm';
import { FAQ } from '../entities';
import { Project } from '../entities/project';
import { faqs } from '../seed-data/faqData';

export default class FaqSeeder {
  public static async execute() {
    await asyncForEach(async faq => {
      const project = await getRepository(Project).findOne({ id: faq.projectId });
      await Object.assign(new FAQ(), { ...faq, project }).save();
    }, faqs);
  }
}
