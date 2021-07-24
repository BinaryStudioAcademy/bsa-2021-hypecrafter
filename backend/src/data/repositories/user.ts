export class UserRepository {
  #users = [
    {
      id: 1,
      name: 'Carmela Sykes'
    },
    {
      id: 2,

      name: 'Esther Leach'
    },
    {
      id: 3,
      name: 'Stuart Powers'
    },
    {
      id: 4,
      name: 'Buckley Morrow'
    },
    {
      id: 5,
      name: 'Cobb Cash'
    }
  ]

  public getAll() {
    return Promise.resolve(this.#users);
  }

  public getById(id: number) {
    return Promise.resolve(this.#users.find(it => it.id === id));
  }
}

export const userRepository = new UserRepository();
