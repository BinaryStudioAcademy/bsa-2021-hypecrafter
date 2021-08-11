import { FC, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import Layout from '../Layout';
import classes from './styles.module.scss';
import Button from '../../../../components/Button';
import { CurrentPage } from '../../enums';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage:CurrentPage
}

const Story: FC<Props> = ({ changePage, currentPage }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const body = (
    <div className={classes.editor}>
      <p>Tell potential contributors more about your campaign.
        Provide details that will motivate people to contribute.
        A good pitch is compelling, informative, and easy to digest.
      </p>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => setContent(newContent)}
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
      header="Set up a story"
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Story;
