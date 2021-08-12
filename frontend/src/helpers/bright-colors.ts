export const randomBrightColor = (length: number) => {
  const colors: string[] = [];
  while (colors.length < length) {
    colors.push(`hsl(${360 * Math.random()},100%,50%)`);
  }
  return colors;
};
