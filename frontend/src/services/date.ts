import moment from 'moment';
import 'moment/locale/uk';

type Moment = typeof moment;

class VisualDate {
  private moment: Moment;

  constructor(
    timeFormat: Moment
  ) {
    this.moment = timeFormat;
  }

  private static getLanguage(language: string): string {
    switch (language) {
      case 'ua':
        return 'uk';
      default:
        return 'en';
    }
  }

  public setLanguage(language: string): void {
    this.moment.locale(VisualDate.getLanguage(language));
  }

  public getRelativeDate(date: string): string {
    return this.moment(date).fromNow();
  }

  public getDate(date: string): string {
    return this.moment(date).format('LL');
  }
}

export const date = new VisualDate(moment);
