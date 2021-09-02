export const littleDateFormate = (date: Date) => {
  const locale = 'en-US';
  const timeZone = { timeZone: 'UTC' };
  const currDateStr = new Date().toLocaleString(locale, timeZone).split(',');
  const argDateStr = date.toLocaleString(locale, timeZone).split(',');
  return currDateStr[0] === argDateStr[0]
    ? 'today'.concat(argDateStr[1])
    : argDateStr.join('');
};
