import { FC } from 'react';
import { CurrentPage } from '../../enums';
import Basic from '../Basic';
import BeforeStart from '../BeforeStart';

interface Props {
  currentPage: CurrentPage,
  onChangePage: (currentPage:CurrentPage)=>void
}

const Layout: FC<Props> = ({ currentPage, onChangePage }) => (
  <div>
    {currentPage === CurrentPage.BEFORE_START && <BeforeStart changePage={onChangePage} />}
    {currentPage === CurrentPage.BASIC && <Basic changePage={onChangePage} />}
  </div>
);
export default Layout;
