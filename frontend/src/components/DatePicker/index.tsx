import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './styles.module.scss';

const DatePickerInput = () => {
  const [startDate, setStartDate] = useState(new Date());
  const triangle = document.getElementsByClassName('react-datepicker__triangle')[0] as HTMLElement;
  triangle.style.left = '-7';
  return (
    <DatePicker
      className={style.input}
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export default DatePickerInput;
