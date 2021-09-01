export const validatePage = (route: string, path: string) => {
  const endPointRoute = route.lastIndexOf('/');
  const endPointPath = (path.lastIndexOf('/'));
  if (Number.isNaN(Number(path.substr(endPointPath + 1)))) { return false; }
  return route.substr(0, endPointRoute) === path.substr(0, endPointPath);
};
