import { useAuth } from './useAuth';
import { useTypedSelector } from './store';

export const useBalance = () => {
  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    const auth = useTypedSelector(({ auth: authData }) => (!authData ? null : authData));
    if (auth?.user) return { isBalance: true, balance: auth.user.balance };
  }
  return { isBalance: false, balance: undefined };
};
