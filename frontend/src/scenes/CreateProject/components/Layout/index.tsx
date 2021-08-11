import { FC, ReactNode } from 'react';
import Button from '../../../../components/Button';
import classes from './styles.module.scss';
import { CurrentPage } from '../../enums';

interface Props{
  header: string,
  body?: ReactNode,
  footer?: ReactNode,
  currentPage?:CurrentPage
}

const Layout: FC<Props> = ({ header, body, footer, currentPage }) => (
  <div className={classes.root}>
    <div className={classes.layout_base}>
      <header>{header}</header>
      <section>
        <aside>
          <div className={classes.menu}>
            <Button>Basic</Button>
            <Button>Story</Button>
            <Button>Team</Button>
            <Button>Funding</Button>
            <Button>Benefits</Button>
            <Button>Settings</Button>
          </div>
        </aside>
        <article>
          {body}
          <footer>{footer}</footer>
        </article>
      </section>
    </div>
  </div>
);
export default Layout;
