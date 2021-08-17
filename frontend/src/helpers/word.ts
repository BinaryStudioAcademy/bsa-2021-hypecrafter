export const сutWord = (word: string, length: number) => {
  if (typeof word === 'string') {
    if (word.length > length) {
      return `${word.slice(0, length)}...`;
    }
  }

  return word;
};
