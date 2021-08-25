import { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils from 'react-day-picker/moment';
import { useLocalization } from '../../providers/localization';
import 'moment/locale/uk';
import 'react-day-picker/lib/style.css';
import styles from './style.scss';

interface DatePickerProps {
  daySetter: (day: Date) => void;
  value?: Date
}

const DatePickerInput: React.FC<DatePickerProps> = ({ daySetter, value }) => {
  const [getNewDate, setNewDate] = useState(value);
  const { formatDate, parseDate } = MomentLocaleUtils;
  const { t } = useLocalization();
  const format = 'LL';
  const locale = t('language');
  const placeholder = formatDate(new Date(), format, locale);
  const dayPickerProps = {
    locale,
    localeUtils: MomentLocaleUtils
  };

  const handleDayChange = (selectedDay: Date): void => {
    if (selectedDay) {
      daySetter(selectedDay);
      setNewDate(selectedDay);
    } else if (typeof getNewDate !== 'undefined') {
      daySetter(getNewDate);
    }
  };

  return (
    <div className="datepicker">
      <DayPickerInput
        classNames={styles}
        placeholder={placeholder}
        formatDate={formatDate}
        parseDate={parseDate}
        format={format}
        dayPickerProps={dayPickerProps}
        onDayChange={handleDayChange}
        value={getNewDate}
        hideOnDayClick
      />
    </div>
  );
};

export default DatePickerInput;
