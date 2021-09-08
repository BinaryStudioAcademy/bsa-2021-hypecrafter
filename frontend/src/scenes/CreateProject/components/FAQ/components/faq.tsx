import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import { CreateProjectFAQ } from '../../../../../common/types/project/createProject';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import { useLocalization } from '../../../../../providers/localization';
import classes from '../styles.module.scss';

interface Props{
  faq: CreateProjectFAQ,
  onChange: (value: CreateProjectFAQ) => void
  onDelete:()=>void
}
const FAQ: FC<Props> = ({ faq, onChange, onDelete }) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const { t } = useLocalization();
  return (
    <div className={classes.privilege}>
      <Button className={classes.close} onClick={() => onDelete()}><FontAwesomeIcon icon={faTimes} /></Button>

      <Input
        type="text"
        label={t('Question')}
        onChange={e => setQuestion(e.target.value)}
        onBlur={e => onChange(
          { ...faq, question: e.target.value }
        )}
        value={question}
      />
      <Input
        type="textarea"
        label={t('Answer')}
        onChange={e => setAnswer(e.target.value)}
        onBlur={e => onChange(
          { ...faq, answer: e.target.value }
        )}
        value={answer}
      />
    </div>
  );
};

export default FAQ;
