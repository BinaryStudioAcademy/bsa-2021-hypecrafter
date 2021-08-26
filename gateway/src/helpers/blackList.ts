import { BLACK_ROUTES } from '../common/constants/blackRoutes';
import { validateUuid } from './uuid';

export const isRouteInBlackList = (path: string) => (BLACK_ROUTES.some(route => {
  if (route.includes('/:id')) {
    return validateUuid(route, path);
  }
  return route === path;
}));
