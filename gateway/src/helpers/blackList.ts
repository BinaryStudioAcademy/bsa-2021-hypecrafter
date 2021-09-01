import { BLACK_ROUTES } from '../common/constants/blackRoutes';
import { validatePage } from './page';
import { validateUuid } from './uuid';

export const isRouteInBlackList = (path: string) => (BLACK_ROUTES.some(route => {
  if (route.includes('/:id')) {
    return validateUuid(route, path);
  }
  if (route.includes('/:page')) return validatePage(route, path);
  return route === path;
}));
