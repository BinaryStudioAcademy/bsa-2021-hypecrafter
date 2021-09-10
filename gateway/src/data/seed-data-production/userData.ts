import { encryptSync } from '../../helpers/crypt';

const hash = (password: string) => encryptSync(password);

export const usersData = [
  {
    id: '4b2ae573-a7c1-47e3-8cac-b7ffededbc5e',
    passwordHash: hash('admin'),
    email: 'admin@gmail.com'
  }
];
