import { removeTokens } from '../helpers/localStorage';
import { removeUser } from '../reducers/removeUser';

export const logout = () => {
  removeTokens();
  removeUser();
};
