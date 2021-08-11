export const asyncForEach = async <T>(fn: (x: T) => Promise<null>, list: readonly T[]) => {
  list.reduce(async (listPromise, item) => {
    await listPromise;
    return fn(item);
  }, Promise.resolve(null));
};
