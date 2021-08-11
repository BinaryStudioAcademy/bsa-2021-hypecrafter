import { FC } from 'react';
import Base from '../Base';
import classes from './styles.module.scss';
import Button from '../../../../components/Button';
import { CurrentPage } from '../../enums';

interface Props {
  changePage: (currentPage:CurrentPage)=>void
}

const BeforeStart: FC<Props> = ({ changePage }) => {
  const handleChangePage = () => changePage(CurrentPage.BASIC);
  const body = (
    <div>
      <p>Do you have a good and well thought-out idea and are you ready to conquer the peaks
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
      <input type="checkbox" title="I agree" aria-label="I agre" />
      <div className={classes.footer}><Button onClick={handleChangePage}>Create Project</Button></div>
    </div>
  );
  return (
    <Base header="Before we start..." body={body} />);
};

export default BeforeStart;
