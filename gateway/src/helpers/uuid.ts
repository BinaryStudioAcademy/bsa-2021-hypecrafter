const uuidV4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const validateUuid = (route: string, path: string) => {
  const startPointId = route.indexOf('/:id') + 1;
  const endPointId = (path.substr(startPointId)).indexOf('/') + startPointId;
  const uuid = path.slice(startPointId, endPointId === startPointId - 1 ? path.length : endPointId);
  return uuidV4Regex.test(uuid);
};
