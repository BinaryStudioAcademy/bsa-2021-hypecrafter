import { FC } from 'react';
import { CreateProjectPrivilege } from '../../../../common/types/project/createProject/privilege';
import Button from '../../../../components/Button';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import DonatorsPrivilege from './components/donatorsPrivilege';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: CreateProjectPrivilege[]) => void,
  donatorsPrivileges: CreateProjectPrivilege[],
  startDate?: Date,
  finishDate?:Date,
}

const Privileges: FC<Props> = ({ donatorsPrivileges, currentPage, changePage, onChangeValue }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const replacePrivilege = (value: CreateProjectPrivilege, index: number) => {
    onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
      donatorsPrivileges.map((privilege, $index) => ($index === index ? value : privilege)));
  };
  const addPrivilege = () => {
    onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
      [...donatorsPrivileges, { title: '', amount: 0, content: '', includes: [] }]);
  };
  const deletePrivilege = (index: number) => {
    onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
      donatorsPrivileges.filter((p, $index) => $index !== index));
  };
  const generateKey = (index:number) => `DonatorsPrivilege_${index}`;
  const body = (
    <div>
      <Button onClick={addPrivilege} className={classes.addPrivilege}>{t('Add privilege')}</Button>
      {donatorsPrivileges.map((privilege, index) => (
        <DonatorsPrivilege
          key={generateKey(index)}
          donatorsPrivilege={privilege}
          onChange={(value) => replacePrivilege(value, index)}
          onDelete={() => deletePrivilege(index)}
        />
      ))}
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Continue')}</Button>
    </div>
  );
  return (
    <Layout
      header={t('What privileges can users have for a specific donation')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Privileges;
