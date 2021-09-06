import { FC } from 'react';
import { CreateProjectFAQ } from '../../../../common/types/project/createProject';
import Button from '../../../../components/Button';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import FAQ from './components/faq';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: CreateProjectFAQ[]) => void,
  faqs: CreateProjectFAQ[]
}

const FAQS: FC<Props> = ({ faqs, currentPage, changePage, onChangeValue }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const replaceFAQ = (value: CreateProjectFAQ, index: number) => {
    onChangeValue(ProjectKeys.FAQS,
      faqs.map((faq, $index) => ($index === index ? value : faq)));
  };
  const addFAQ = () => {
    onChangeValue(ProjectKeys.FAQS,
      [...faqs, { answer: '', question: '' }]);
  };
  const deleteFAQ = (index: number) => {
    onChangeValue(ProjectKeys.FAQS,
      faqs.filter((f, $index) => $index !== index));
  };
  const generateKey = (index:number) => `FAQ_${index}`;
  const body = (
    <div>
      <Button onClick={addFAQ} className={classes.addPrivilege}>{t('Add question')}</Button>
      {faqs.map((faq, index) => (
        <FAQ
          key={generateKey(index)}
          faq={faq}
          onChange={(value) => replaceFAQ(value, index)}
          onDelete={() => deleteFAQ(index)}
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
      header={t('Foresee popular questions and give answers to them')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default FAQS;
