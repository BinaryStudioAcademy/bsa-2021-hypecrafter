const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

export const validateUuid = (route: string, path: string) => {
  const indexOfId = route.indexOf('/:id');
  const uuid = path.slice(indexOfId + 1, indexOfId + 37);
  return uuid.match(uuidV4Regex);
};
