import { encryptSync } from "../../helpers/crypt";

const hash = (password: string) => encryptSync(password);

export const usersData = [
  {
    id: 'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529',
    passwordHash: hash('password1'),
    email: 'example1@gmail.com'
  },
  {
    id: '4da2c9f3-ce90-4817-90d0-5116d57a5b14',
    passwordHash: hash('password2'),
    email: 'example2@gmail.com'
  },
  {
    id: '95e27387-bf47-46c1-b06d-db6a5629db54',
    passwordHash: hash('password3'),
    email: 'example3@gmail.com'
  },
  {
    id: 'aa984f73-fadc-4d9a-8a9f-e0e50002f061',
    passwordHash: hash('password4'),
    email: 'example4@gmail.com'
  },
  {
    id: 'd5906099-40f2-445b-842e-5bfd4caa7749',
    passwordHash: hash('password5'),
    email: 'example5@gmail.com'
  },
  {
    id: 'c8bf2182-54a3-4464-9a50-0099ad0ab632',
    passwordHash: hash('password6'),
    email: 'example6@gmail.com'
  },
  {
    id: 'eff15a92-fed4-41c8-a8d4-76f837c1892c',
    passwordHash: hash('password7'),
    email: 'example7@gmail.com'
  }
];
