import { TimeInterval } from 'hypecrafter-shared/enums';

enum CardKeys {
  totalViews = 'totalViews',
  minutesToRead = 'minutesToRead',
  totalInteractionTime = 'totalInteractionTime'
}

export const getTimeText = (interval: TimeInterval) => {
  switch (interval) {
    case TimeInterval.AllTime:
      return 'All Time';
    case TimeInterval.Day:
      return 'Day';
    case TimeInterval.Month:
      return 'Month';
    case TimeInterval.Year:
      return 'Year';
    default:
      return '';
  }
};

export const getCardText = (key: string) => {
  switch (key) {
    case CardKeys.minutesToRead:
      return 'Minutes to Read';
    case CardKeys.totalInteractionTime:
      return 'Interaction time';
    case CardKeys.totalViews:
      return 'Views';
    default:
      return '';
  }
};
