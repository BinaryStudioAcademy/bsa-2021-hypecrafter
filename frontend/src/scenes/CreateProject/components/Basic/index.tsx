import { FC } from 'react';
import Base from '../Base';
import classes from './styles.module.scss';
import Button from '../../../../components/Button';
import { CurrentPage } from '../../enums';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

interface Props {
  changePage: (currentPage:CurrentPage)=>void
}

const Basic: FC<Props> = ({ changePage }) => {
  const handleBack = () => changePage(CurrentPage.BEFORE_START);
  const handleNext = () => changePage(CurrentPage.STORY);
  const body = (
    <div>
      <Select
        options={[{ text: 'test1', value: 'test1' }, { text: 'test2', value: 'test2' }]}
        label="Pick a project category to connect with a specific community."
      />
      <Input
        type="textarea"
        label="Describe what you’ll be creating."
      />
      <div className={classes.footer}>
        <Button onClick={handleBack} className={classes.back}>Go back</Button>
        <Button onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
  return (
    <Base header="First, let’s get you set up." body={body} />);
};

export default Basic;
