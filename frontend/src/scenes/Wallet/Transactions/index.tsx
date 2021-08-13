import { FC, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTable, Column, Cell, useSortBy } from 'react-table';
import classes from './styles.module.scss';
import mock from './mock.json';
import { useLocalization } from '../../../providers/localization';
import { Data, getColumns } from './utils';
import { Routes } from '../../../common/enums';
import RenderCell from './RenderCell';

const Transactions: FC = () => {
  const { t, selectedLanguage } = useLocalization();
  const data: Data[] = useMemo(() => [...mock], []);
  const columns: Column<Data>[] = useMemo(
    () => getColumns(t),
    [selectedLanguage]
  );
  console.log(columns);
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Data>(
    { columns, data },
    useSortBy
  );
  return (
    <div className={classes['transaction-table-wrp']}>
      <div className={classes.breadcrumbs}>
        <Link to={Routes.HOME}> {t('Home')}</Link>
        {' > '}
        <Link to="/account">{t('Account')}</Link>
        {' > '}
        <span>{t('Transaction list')}</span>
      </div>
      <h2 className={classes['wallet-header-title']}>
        {t('Transaction list')}
      </h2>
      <table className={classes['transaction-table']}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps({
                    style: { maxWidth: column.maxWidth, minWidth: column.minWidth, width: column.width }
                  })}
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
              <tr {...row.getRowProps()}>
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
                  return <RenderCell {...props} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Transactions;
