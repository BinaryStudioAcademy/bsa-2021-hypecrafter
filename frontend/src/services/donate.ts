import { api } from '../helpers';

export const postDonate = (projectId: string, amount: number) => api
  .post({ url: 'donate', params: { projectId, amount } });
