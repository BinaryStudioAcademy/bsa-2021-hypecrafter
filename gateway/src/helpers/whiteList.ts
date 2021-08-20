import { WHITE_ROUTES } from '../common/constants/whiteRouts';
import { validateUuid } from './uuid';

export const isRouteInWhiteList = (path: string) => (WHITE_ROUTES.some(route => {
  if (route.includes('/:id')) {
    return validateUuid(route, path);
  }
  return route === path;
}));
