export const asyncForEach = async <T>(fn: (x: T) => Promise<void>, list: readonly T[]) => {
  for (let i = 0; i < list.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await fn(list[i]);
  }
};
