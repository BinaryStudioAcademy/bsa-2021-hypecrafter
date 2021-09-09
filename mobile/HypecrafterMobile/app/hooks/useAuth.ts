import { useTypedSelector } from './store';

export const useAuth = () => (
  useTypedSelector(({ auth }) => (
    !auth.user
      ? { id: undefined, isAuthorized: false }
      : { id: auth.user.id, isAuthorized: true }
  ))
);
