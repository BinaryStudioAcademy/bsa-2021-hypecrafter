import { FC, ReactNode } from 'react';
import Button from '../../../../components/Button';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage } from '../../enums';
import classes from './styles.module.scss';

interface Props{
  header: string,
  body?: ReactNode,
  footer?: ReactNode,
  currentPage?: CurrentPage
  setCurrentPage:(page:CurrentPage)=>void
}
interface OptionsMenu{
  page: CurrentPage,
  label: LocaleKeys
}

const Layout: FC<Props> = ({ header, body, footer, currentPage, setCurrentPage }) => {
  const { t } = useLocalization();
  const options: OptionsMenu[] = [
    { page: CurrentPage.BASIC, label: 'Basic' },
    { page: CurrentPage.STORY, label: 'Story' },
    { page: CurrentPage.TEAM, label: 'Team' },
    { page: CurrentPage.FUNDING, label: 'Funding' },
    { page: CurrentPage.PRIVILEGES, label: 'Privileges' },
    { page: CurrentPage.SETTINGS, label: 'Settings' }
  ];
  return (
    <div className={classes.root}>
      <div className={classes.layout_base}>
        <header>{header}</header>
        <section>
          <aside>{currentPage !== CurrentPage.BEFORE_START && (
            <div className={classes.menu}>
              {options.map(it => (
                <Button
                  key={it.page}
                  onClick={() => setCurrentPage(it.page)}
                  className={it.page === currentPage ? classes.activePage : ''}
                >{t(it.label)}
                </Button>
              ))}
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
};
export default Layout;
