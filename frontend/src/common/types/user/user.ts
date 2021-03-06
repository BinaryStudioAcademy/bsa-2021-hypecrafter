export interface User {
  id: string,
  name: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  balance: number,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: number,
      lng: number
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}
