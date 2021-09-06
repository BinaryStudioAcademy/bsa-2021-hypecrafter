import { Project } from '../../data/entities';
import { DonatorsPrivilegeRepository } from '../../data/repositories';

interface DonatorsPrivilege{
  project: Project;
  amount: number;
  title: string;
  content: string;
  includes: string[];
}
export default class DonatorsPrivilegeServise {
  readonly #donatorsPrivilegeRepository: DonatorsPrivilegeRepository;

  constructor(donatorsPrivilegeRepository: DonatorsPrivilegeRepository) {
    this.#donatorsPrivilegeRepository = donatorsPrivilegeRepository;
  }

  public async save(donatorsPrivilege:DonatorsPrivilege[]) {
    const tags = await this.#donatorsPrivilegeRepository.save(donatorsPrivilege);
    return tags;
  }
}
