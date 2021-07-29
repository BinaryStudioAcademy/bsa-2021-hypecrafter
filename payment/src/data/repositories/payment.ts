export class PaymentRepository {
  #payments = [
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
    return Promise.resolve(this.#payments);
  }

  public getById(id: string) {
    return Promise.resolve(this.#payments.find(it => it.id === Number(id)));
  }
}

export const paymentRepository = new PaymentRepository();
