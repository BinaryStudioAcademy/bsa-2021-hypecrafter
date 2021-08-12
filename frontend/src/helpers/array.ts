export const getSortedArray = (array: any[], field: string) => {
  array.sort((a, b) => (a[field] > b[field] ? -1 : 1));
};
