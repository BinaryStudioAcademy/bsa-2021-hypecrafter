import { useLocalization } from '../../providers/localization';

export const littleDateFormate = (date: Date) => {
  const { selectedLanguage: locale } = useLocalization();

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  } as const;

  const currDateStr = new Date()
    .toLocaleTimeString([locale], options)
    .split(',');
  const argDateArr = date.toLocaleTimeString([locale], options).split(',');

  return currDateStr[0] === argDateArr[0]
    ? 'today at '.concat(argDateArr[1])
    : `${argDateArr[0]} at ${argDateArr[1]}`;
};
