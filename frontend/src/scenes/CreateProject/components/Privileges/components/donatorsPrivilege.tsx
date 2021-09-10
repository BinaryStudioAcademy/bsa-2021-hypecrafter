import { faCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import { CreateProjectPrivilege } from '../../../../../common/types/project/createProject/privilege';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import { useLocalization } from '../../../../../providers/localization';
import classes from '../styles.module.scss';

interface Props{
  donatorsPrivilege: CreateProjectPrivilege,
  onChange: (value: CreateProjectPrivilege) => void
  onDelete:()=>void
}
const DonatorsPrivilege: FC<Props> = ({ donatorsPrivilege, onChange, onDelete }) => {
  const [point, setPoint] = useState('');
  const [title, setTitle] = useState(donatorsPrivilege.title);
  const [amount, setAmount] = useState(donatorsPrivilege.amount);
  const [content, setContent] = useState(donatorsPrivilege.content);
  const { t } = useLocalization();
  const addPoint = () => {
    if (!donatorsPrivilege?.includes?.find(_point => point === _point)) {
      onChange(
        {
          ...donatorsPrivilege,
          includes: donatorsPrivilege.includes
            ? [...donatorsPrivilege.includes, point] : [point]
        }
      );
      setPoint('');
    }
  };
  const deletePoint = (pointToDelete:string) => {
    const listPoints = donatorsPrivilege.includes.filter(_point => _point !== pointToDelete);
    onChange({ ...donatorsPrivilege, includes: listPoints });
  };
  return (
    <div className={classes.privilege}>
      <Button className={classes.close} onClick={() => onDelete()}><FontAwesomeIcon icon={faTimes} /></Button>
      <Input
        type="number"
        label={t('How much the user must pay to get this option')}
        onChange={e => setAmount(Number(e.target.value))}
        onBlur={e => onChange(
          { ...donatorsPrivilege, amount: Number(e.target.value) }
        )}
        value={amount}
      />
      <Input
        type="text"
        label={t('Privilege header')}
        onChange={e => setTitle(e.target.value)}
        onBlur={e => onChange(
          { ...donatorsPrivilege, title: e.target.value }
        )}
        value={title}
      />
      <Input
        type="textarea"
        label={t('Privilege description')}
        onChange={e => setContent(e.target.value)}
        onBlur={e => onChange(
          { ...donatorsPrivilege, content: e.target.value }
        )}
        value={content}
      />
      <div className={classes.pointControl}>
        <Input
          type="text"
          label={t('Enter new subparagraph')}
          onChange={e => setPoint(e.target.value)}
          value={point}
        />
        <Button onClick={addPoint} className={classes.addPoint}><FontAwesomeIcon icon={faPlus} /></Button>
      </div>
      <ul className={classes.listPoints}>{donatorsPrivilege.includes.map(_point => (
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
};

export default DonatorsPrivilege;
