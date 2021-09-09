import { Comment } from '../common/types';
import { api } from '../helpers/http';

export const addComment = async (body: any) => {
  const project: Comment = await api.post({ url: 'comments', params: body });
  return project;
};
