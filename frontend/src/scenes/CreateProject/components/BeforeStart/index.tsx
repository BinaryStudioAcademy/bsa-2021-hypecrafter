import { FC, useState } from 'react';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import { CurrentPage } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage:CurrentPage
}

const BeforeStart: FC<Props> = ({ changePage, currentPage }) => {
  const [checked, setChecked] = useState(false);
  const handleChangePage = () => changePage(CurrentPage.BASIC);

  const handleChange = () => {
    setChecked(!checked);
  };
  const body = (
    <div>
      <p className={classes.text}>Do you have a good and well thought-out idea and are you ready to conquer the peaks
        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!Do you have a good and well thought-out idea and are you ready to conquer the peaks

        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!Do you have a good and well thought-out idea and are you ready to conquer the peaks

        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!Do you have a good and well thought-out idea and are you ready to conquer the peaks

        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!Do you have a good and well thought-out idea and are you ready to conquer the peaks

        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!Do you have a good and well thought-out idea and are you ready to conquer the peaks
        on your own to make your dream come true? But sometimes, alone, the difficult path
        from concept to finished product is not easy at all. HypeCrafter will lend a helping hand,
        and more than one!
      </p>
      <Checkbox label="I agree with privacy consent" value={checked} onChange={handleChange} />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleChangePage} disabled={!checked}>Create Project</Button>
    </div>
  );

  return (
    <Layout
      header="Before we start..."
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default BeforeStart;
