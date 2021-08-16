import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import styles from './style.scss';

interface DatePickerProps {
  daySetter: (day: Date) => void;
}

const DatePickerInput: React.FC<DatePickerProps> = ({ daySetter }) => {
  const handleDayChange = (selectedDay: Date) => {
    daySetter(selectedDay);
  };

  return (
    <DayPickerInput
      classNames={styles}
      placeholder="DD/MM/YYYY"
      format="DD/MM/YYYY"
      onDayChange={handleDayChange}
    />
  );
};

export default DatePickerInput;
