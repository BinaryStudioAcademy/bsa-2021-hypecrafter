import { FC, useState } from 'react';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import Select from '../../../../components/Select';
import { CurrentPage } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage:CurrentPage
}

const Team: FC<Props> = ({ changePage, currentPage }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const body = (
    <div>
      <Select
        options={[{ text: 'test1', value: 'test1' }, { text: 'test2', value: 'test2' }]}
        label="Pick a members to add they to team."
      />
      <Button onClick={handleBack} className={classes.addMember}>Add</Button>
      <p>We will notify this person</p>
      <Checkbox value={checked} onChange={handleChange} label='I agree' />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>Go back</Button>
      <Button onClick={handleNext} isDisabled={!checked}>Continue</Button>
    </div>
  );
  return (
    <Layout
      header="Add member"
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Team;
