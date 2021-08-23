import { DayModifiers } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import LocaleUtils from 'react-day-picker/moment';
import styles from './style.scss';

interface DatePickerProps {
  daySetter: (day: Date) => void;
  value?: Date | string;
}

const DatePickerInput: React.FC<DatePickerProps> = ({ daySetter, value }) => {
  const { formatDate, parseDate } = LocaleUtils;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDayChange = (selectedDay: Date, _: DayModifiers, dayPickerInput: DayPickerInput) => {
    // const input = dayPickerInput.getInput();

    // const momentFormat = 'DD/MM/YYYY';
    // const momentMask = IMask(input, {
    //   mask: Date,
    //   pattern: momentFormat,
    //   lazy: false,
    //   min: new Date(1900, 0, 1),
    //   max: new Date(),

    //   format(date) {
    //     return moment(date).format(momentFormat);
    //   },
    //   parse(str) {
    //     return moment(str, momentFormat);
    //   },

    //   blocks: {
    //     YYYY: {
    //       mask: IMask.MaskedRange,
    //       from: 1900,
    //       to: new Date().getFullYear()
    //     },
    //     MM: {
    //       mask: IMask.MaskedRange,
    //       from: 1,
    //       to: 12
    //     },
    //     DD: {
    //       mask: IMask.MaskedRange,
    //       from: 1,
    //       to: 31
    //     }
    //   }
    // });

    // input.value = momentMask.value;

    // console.log(momentMask);
    daySetter(selectedDay);
  };

  return (
    <div className="datepicker">
      <DayPickerInput
        classNames={styles}
        placeholder={`${formatDate(new Date())}`}
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={handleDayChange}
        value={value}
      />

    </div>
  );
};

export default DatePickerInput;
