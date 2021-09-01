import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import { CreateProjectPrivilege } from '../../../../common/types/project/createProject/privilege';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: CreateProjectPrivilege) => void,
  donatorsPrivileges: CreateProjectPrivilege[],
  startDate?: Date,
  finishDate?:Date,
}

const Privileges: FC<Props> = ({ donatorsPrivileges, currentPage, changePage, onChangeValue }) => {
  const [point, setPoint] = useState('');
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const addPoint = () => {
    if (!donatorsPrivileges?.includes?.find(_point => point === _point)) {
      onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
        {
          ...donatorsPrivileges,
          includes: donatorsPrivileges.includes
            ? [...donatorsPrivileges.includes, point] : [point]
        });
      setPoint('');
    }
  };
  const deletePoint = (pointToDelete:string) => {
    const listPoints = donatorsPrivileges.includes.filter(_point => _point !== pointToDelete);
    onChangeValue(ProjectKeys.DONATORS_PRIVILEGES, { ...donatorsPrivileges, includes: listPoints });
  };
  const body = (
    <div>
      <Input
        type="number"
        label={t('How much the user must pay to get this option')}
        onChange={e => onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
          { ... , amount: Number(e.target.value) })}
        value={donatorsPrivileges?.amount}
      />
      <Input
        type="text"
        label={t('Privilege header')}
        onChange={e => onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
          { ...donatorsPrivileges, title: e.target.value })}
        value={donatorsPrivileges?.title}
      />
      <Input
        type="textarea"
        label={t('Privilege description')}
        onChange={e => onChangeValue(ProjectKeys.DONATORS_PRIVILEGES,
          { ...donatorsPrivileges, content: e.target.value })}
        value={donatorsPrivileges?.content}
      />
      {/* <p>{t('Subparagraphs')}</p> */}
      <div className={classes.pointControl}>
        <Input
          type="text"
          label={t('Enter new subparagraph')}
          onChange={e => setPoint(e.target.value)}
          value={point}
        />
        <Button onClick={addPoint} className={classes.addPoint}>{t('Add')}</Button>
      </div>
      <ul className={classes.listPoints}>{donatorsPrivileges.includes.map(_point => (
        <li key={_point}>
          <FontAwesomeIcon icon={faCircle} className={classes.circle} />
          {_point}
          <Button
            className={classes.deletePoint}
            key={_point}
            onClick={() => deletePoint(_point)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </li>
      ))}
      </ul>
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
