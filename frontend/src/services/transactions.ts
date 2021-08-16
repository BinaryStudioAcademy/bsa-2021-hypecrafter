import { api } from '../helpers';

export const getPage = (userId: string, pageNum: number) => {
  console.log(userId, pageNum);
  return api.get({ url: `payment/${userId}/${pageNum}` });
};
