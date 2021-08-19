import moment from 'moment';
import 'moment/locale/uk';
import { useLocalization } from '../providers/localization';

type UseLocalization = typeof useLocalization;
type Moment = typeof moment;

class VisualDate {
  readonly locale: UseLocalization;

  readonly moment: Moment;

  constructor(
    locale : UseLocalization,
    timeFormat: Moment
  ) {
    this.locale = locale;
    this.moment = timeFormat;
  }

  private setLanguage() {
    const { t } = this.locale();
    moment.locale(t('language'));
  }

  public getRelativeDate(date: string): string {
    this.setLanguage();
    return this.moment(date).fromNow();
  }

  public getDate(date: string): string {
    this.setLanguage();
    return moment(date).format('LL');
  }
}

export const date = new VisualDate(useLocalization, moment);
