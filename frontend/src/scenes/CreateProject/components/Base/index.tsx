import { FC, ReactNode } from 'react';
import Button from '../../../../components/Button';
import classes from './styles.module.scss';
import { CurrentPage } from '../../enums';

interface Props{
  header: string,
  body?: ReactNode,
  currentPage?:CurrentPage
}

const Base: FC<Props> = ({ header, body, currentPage }) => (
  <div className={classes.root}>
    <div className={classes.layout_base}>
      <h1 className={classes.layout_name}>{header}</h1>
      <div className={classes.layout_body}>
        <div className={classes.layout_left}>
          <div className={classes.layout_left_menu}>
            <Button>Basic</Button>
            <Button>Story</Button>
            <Button>Team</Button>
            <Button>Funding</Button>
            <Button>Benefits</Button>
            <Button>Settings</Button>
          </div>
        </div>
        <div className={classes.layout_center}>{body}</div>
      </div>
    </div>
  </div>
);
export default Base;
