import { FC, useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column, useSortBy, useTable } from 'react-table';
import { Routes } from '../../../common/enums';
import Button from '../../../components/Button';
import { useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import RenderCell from './RenderCell';
import classes from './styles.module.scss';
import { getColumns, HeaderI } from './utils';

const Transactions: FC = () => {
  const { page, isLast, isLoading } = useTypedSelector(
    (
      { transactions }
    ) => transactions
  );
  const { t, selectedLanguage } = useLocalization();
  const data: HeaderI[] = useMemo(() => [...page], []);
  const columns: Column<HeaderI>[] = useMemo(
    () => getColumns(t),
    [selectedLanguage]
  );
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable<HeaderI>(
    { columns, data },
    useSortBy
  );
  const btnLoadMore = <Button variant="secondary">Load more</Button>;
  const spinner = (
    <Spinner animation="border" role="status" variant="secondary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
  return (
    <div className={classes['transaction-table-wrp']}>
      <div className={classes.breadcrumbs}>
        <Link to={Routes.HOME}> {t('Home')}</Link>
        {' > '}
        <Link to="/account">{t('Account')}</Link>
        {' > '}
        <span>{t('Transactions list')}</span>
      </div>
      <h2 className={classes['wallet-header-title']}>
        {t('Transactions list')}
      </h2>
      <table className={classes['transaction-table']}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps({
                    style: { maxWidth: column.maxWidth, minWidth: column.minWidth, width: column.width }
                  })}
                  key={column.id}
                >
                  <span>{column.render('Header')}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  const props = {
                    t,
                    props: cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                        width: cell.column.width
                      }
                    }),
                    cell
                  };
                  return <RenderCell {...props} key={cell.column.id} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes['pagination-wrp']}>
        {isLast ? isLoading ? spinner : btnLoadMore : false}
      </div>
    </div>
  );
};
export default Transactions;
