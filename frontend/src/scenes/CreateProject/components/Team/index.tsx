import { FC, useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import LoaderWrapper from '../../../../components/LoaderWrapper';
import Select from '../../../../components/Select';
import { useAction, useTypedSelector } from '../../../../hooks';
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

  const store = useTypedSelector(({ users: { users, isLoading } }) => ({
    users,
    isLoading
  }));
  const { users, isLoading } = store;
  const { getUsersAction } = useAction();

  useEffect(() => {
    getUsersAction();
  }, [getUsersAction]);

  const body = (
    <div>
      <Select
        options={users.map(user => ({ text: `${user.lastName} ${user.firstName} (${user.email})`, value: user.id }))}
        label="Pick a members to add they to team."
        defaultText="-"
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
    <LoaderWrapper isLoading={isLoading}>
      <Layout
        header="Add member"
        setCurrentPage={changePage}
        body={body}
        footer={footer}
        currentPage={currentPage}
      />
    </LoaderWrapper>
  );
};

export default Team;
