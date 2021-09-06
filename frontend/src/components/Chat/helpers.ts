import { useLocalization } from '../../providers/localization';
import { date as visualDate } from '../../services/date';

export const littleDateFormate = (date: Date) => {
  const { t, selectedLanguage: locale } = useLocalization();

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  } as const;

  const [currDate] = new Date()
    .toLocaleTimeString([locale], options)
    .split(',');
  const [argDate, argTime] = date
    .toLocaleTimeString([locale], options)
    .split(',');

  const todayDate = `${t('today')} ${t('at')} ${argTime}`;
  const otherDate = `${visualDate.getDate(argDate)} ${t('at')} ${argTime}`;

  return currDate === argDate ? todayDate : otherDate;
};
