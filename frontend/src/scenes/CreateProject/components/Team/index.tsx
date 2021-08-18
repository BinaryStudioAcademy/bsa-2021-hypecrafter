import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import LoaderWrapper from '../../../../components/LoaderWrapper';
import Select from '../../../../components/Select';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import { Team as TeamType } from '../../types/team';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  team: TeamType,
  onChangeValue: (name: ProjectKeys, value: any) => void,
}

const Team: FC<Props> = ({ changePage, currentPage, team, onChangeValue }) => {
  const { t } = useLocalization();
  const [checked, setChecked] = useState(false);
  const [selectedUser, setUser] = useState('');
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

  const addMember = () => {
    const member = users.find(user => user.id === selectedUser);
    const isExist = team.chats.find(chat => chat.donator.id === selectedUser);
    if (selectedUser && member && !isExist) {
      team.chats.push({ donator: { firstName: member.firstName, lastName: member.lastName, id: member?.id } });
      onChangeValue(ProjectKeys.TEAM, team);
    }
  };
  const deleteMember = (idUser:string) => {
    const chats = team.chats.filter(chat => chat.donator.id !== idUser);
    onChangeValue(ProjectKeys.TEAM, { ...team, chats });
  };
  const body = (
    <div>
      <div className={classes.selectUser}>
        <Select
          options={users.map(user => ({ text: `${user.lastName} ${user.firstName} (${user.email})`, value: user.id }))}
          label={t('Pick a members to add they to team.')}
          defaultText="-"
          onSelectChange={value => setUser(value)}
        />
        <Button onClick={addMember} className={classes.addMember}>{t('Add')}</Button>
      </div>
      <div className={classes.listMembers}>{team.chats.map(chat => (
        <Button
          className={classes.member}
          key={chat.donator.id}
          id={chat.donator.id}
          onClick={() => deleteMember(chat.donator.id)}
        >
          {`${chat.donator.lastName} ${chat.donator.firstName}`}
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ))}
      </div>
      <p>{t('We will notify this person')}</p>
      <Checkbox value={checked} onChange={handleChange} label={t('I agree')} />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext} disable={!checked}>{t('Continue')}</Button>
    </div>
  );
  return (
    <LoaderWrapper isLoading={isLoading}>
      <Layout
        header={t('Add member')}
        setCurrentPage={changePage}
        body={body}
        footer={footer}
        currentPage={currentPage}
      />
    </LoaderWrapper>
  );
};

export default Team;
