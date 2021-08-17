import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styles from './style.scss';

interface DatePickerProps {
  daySetter: (day: Date) => void;
  value?:Date
}

const DatePickerInput: React.FC<DatePickerProps> = ({ daySetter, value }) => {
  const handleDayChange = (selectedDay: Date) => {
    daySetter(selectedDay);
  };

  return (
    <DayPickerInput
      classNames={styles}
      placeholder="DD/MM/YYYY"
      format="DD/MM/YYYY"
      onDayChange={handleDayChange}
      value={value}
    />
  );
};

export default DatePickerInput;
