import { useSelector } from 'react-redux';
import { StoreState } from '../common/types/store';

export const useAuth = () => {
  const id = useSelector(({ auth: { user } }: StoreState) => {
    if (!user) return null;
    if (typeof user.id === 'undefined') return null;
    return user.id;
  });

  const isAuthorized = Boolean(id);

  return { id, isAuthorized };
};
