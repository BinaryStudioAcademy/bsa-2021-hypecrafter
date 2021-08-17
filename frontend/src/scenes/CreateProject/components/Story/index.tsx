import JoditEditor from 'jodit-react';
import { FC, useRef } from 'react';
import Button from '../../../../components/Button';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: string) => void,
  content:string
}

const Story: FC<Props> = ({ changePage, currentPage, onChangeValue, content }) => {
  const { t } = useLocalization();
  const editor = useRef(null);
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const body = (
    <div className={classes.editor}>
      <p>{t('Tell potential contributors more about your campaign.')
        + t('Provide details that will motivate people to contribute.')
        + t('A good pitch is compelling, informative, and easy to digest.')}
      </p>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={newContent => onChangeValue(ProjectKeys.CONTENT, newContent)}
        onChange={newContent => onChangeValue(ProjectKeys.CONTENT, newContent)}
      />
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
      header={t('Set up a story')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Story;
