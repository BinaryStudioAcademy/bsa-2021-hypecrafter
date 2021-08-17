const uuidV4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const validateUuid = (route: string, path: string) => {
  const indexOfId = route.indexOf('/:id');
  const uuid = path.slice(indexOfId + 1, path.length);
  return uuidV4Regex.test(uuid);
};
