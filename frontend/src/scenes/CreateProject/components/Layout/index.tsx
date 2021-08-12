import { FC, ReactNode } from 'react';
import Button from '../../../../components/Button';
import { CurrentPage } from '../../enums';
import classes from './styles.module.scss';

interface Props{
  header: string,
  body?: ReactNode,
  footer?: ReactNode,
  currentPage?: CurrentPage
  setCurrentPage:(page:CurrentPage)=>void
}

const Layout: FC<Props> = ({ header, body, footer, currentPage, setCurrentPage }) => (
  <div className={classes.root}>
    <div className={classes.layout_base}>
      <header>{header}</header>
      <section>
        <aside>{currentPage !== CurrentPage.BEFORE_START && (
        <div className={classes.menu}>
          <Button
            onClick={() => setCurrentPage(CurrentPage.BASIC)}
            className={currentPage === CurrentPage.BASIC ? classes.activePage : ''}
          >Basic
          </Button>
          <Button
            onClick={() => setCurrentPage(CurrentPage.STORY)}
            className={currentPage === CurrentPage.STORY ? classes.activePage : ''}
          >Story
          </Button>
          <Button
            onClick={() => setCurrentPage(CurrentPage.TEAM)}
            className={currentPage === CurrentPage.TEAM ? classes.activePage : ''}
          >Team
          </Button>
          <Button
            onClick={() => setCurrentPage(CurrentPage.FUNDING)}
            className={currentPage === CurrentPage.FUNDING ? classes.activePage : ''}
          >Funding
          </Button>
          <Button
            onClick={() => setCurrentPage(CurrentPage.BENEFITS)}
            className={currentPage === CurrentPage.BENEFITS ? classes.activePage : ''}
          >Benefits
          </Button>
          <Button
            onClick={() => setCurrentPage(CurrentPage.SETTINGS)}
            className={currentPage === CurrentPage.SETTINGS ? classes.activePage : ''}
          >Settings
          </Button>
        </div>
        )}
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
