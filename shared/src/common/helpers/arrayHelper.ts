export const asyncForEach = async <T>(fn: (x: T) => Promise<void>, list: readonly T[]) => {
  list.reduce(async (listPromise, item) => {
    await listPromise;
    return fn(item);
  }, Promise.resolve(null));
};
