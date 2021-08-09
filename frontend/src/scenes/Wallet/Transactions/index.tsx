import { FC, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTable, Column, Cell, useSortBy } from 'react-table';
import classes from './styles.module.scss';
import mock from './mock.json';
import { useLocalization, TranslatorType } from '../../../providers/localization';
import coinImg from '../../../assets/HypeCoin.png';

interface Data {
  date: string;
  items: string;
  type: string;
  total: number;
  change: number;
  balance: number;
}

function RenderCell(cell: Cell<Data>, t:TranslatorType) {
  console.log(cell.column.Header);
  switch (cell.column.Header) {
    case t('Total'):
      return (
        <>
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </>
      );
    case t('Change'):
      return (
        <>
          {cell.value > 0 ? '+' : false}
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </>
      );
    case t('Balance'):
      return (
        <>
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </>
      );
    default:
      return cell.value;
  }
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
                  return <td {...cell.getCellProps()}>{RenderCell(cell, t)}</td>;
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
