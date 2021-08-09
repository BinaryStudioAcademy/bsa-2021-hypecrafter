import { FC, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTable, Column, useSortBy } from 'react-table';
import classes from './styles.module.scss';
import mock from './mock.json';
import { useLocalization } from '../../../providers/localization';
import coinImg from '../../../assets/HypeCoin.png';

interface Data {
  date: string;
  items: string;
  type: string;
  total: number;
  change: number;
  balance: number;
}
const Transactions: FC = () => {
  const { t, selectedLanguage } = useLocalization();
  const data: Data[] = useMemo(() => [...mock], []);
  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: t('Date'),
        accessor: 'date'
      },
      {
        Header: t('Items'),
        accessor: 'items'
      },
      {
        Header: t('Type'),
        accessor: 'type'
      },
      {
        Header: t('Total'),
        accessor: 'total'
      },
      {
        Header: t('Change'),
        accessor: 'change'
      },
      {
        Header: t('Balance'),
        accessor: 'balance'
      }
    ],
    [selectedLanguage]
  );

  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Data>(
    { columns, data },
    useSortBy
  );
  return (
    <div className={classes['transaction-table-wrp']}>
      <div className={classes.breadcrumbs}>
        <Link to="/"> {t('Home')}</Link>
        {' > '}
        <Link to="/account">{t('Account')}</Link>
        {' > '}
        <span>{t('Transaction list')}</span>
      </div>
      <h2 className={classes['wallet-header-title']}>
        {t('Transaction list')}
      </h2>
      <Table
        className={classes['transaction-table']}
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                  console.log(cell);
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === t('Change') && cell.value > 0
                        ? '+'
                        : false}
                      {cell.render('Cell')}
                      {cell.column.Header === t('Total')
                      || cell.column.Header === t('Change')
                      || cell.column.Header === t('Balance') ? (
                        <img src={coinImg} alt="Coin" />
                        ) : (
                          false
                        )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Transactions;
