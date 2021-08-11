import { FC } from 'react';
import Layout from '../Layout';
import classes from './styles.module.scss';
import Button from '../../../../components/Button';
import { CurrentPage } from '../../enums';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage:CurrentPage
}

const Basic: FC<Props> = ({ changePage, currentPage }) => {
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
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

    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>Go back</Button>
      <Button onClick={handleNext}>Continue</Button>
    </div>
  );
  return (
    <Layout
      header="First, let’s get you set up."
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Basic;
