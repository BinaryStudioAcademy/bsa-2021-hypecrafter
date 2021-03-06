import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column, useTable } from 'react-table';
import { Routes } from '../../../common/enums';
import { PageRow } from '../../../common/types';
import Button from '../../../components/Button';
import Seo from '../../../components/Seo';
import { useAction, useAuth, useTypedSelector } from '../../../hooks';
import { useLocalization } from '../../../providers/localization';
import RenderCell from './RenderCell';
import classes from './styles.module.scss';
import { getColumns } from './utils';

const Transactions: FC = () => {
  const { fetchTransactionsPageAction, clearTransactionsStateAction, openModalAction } = useAction();
  const [lastPage, setLastPage] = useState(0);
  const { id: userId } = useAuth();
  const { page, isLast, isLoading } = useTypedSelector(
    (
      { transactions }
    ) => transactions
  );
  const updatePage = useCallback(
    () => {
      if (lastPage === 0) { clearTransactionsStateAction(); }
      fetchTransactionsPageAction('ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529', lastPage + 1);
      setLastPage(lastPage + 1);
    }, [lastPage]
  );
  useEffect(() => { updatePage(); }, []);
  const { t, selectedLanguage } = useLocalization();
  const pagination = useMemo(() => {
    if (isLast) return false;
    if (isLoading) {
      return (
        <Spinner animation="border" role="status" variant="secondary">
          <span className="visually-hidden">{t('Loading...')}</span>
        </Spinner>
      );
    }
    return (<Button onClick={updatePage} variant="secondary">{t('Load more')}</Button>);
  }, [isLast, isLoading]);
  const columns: Column<PageRow>[] = useMemo(
    () => getColumns(t),
    [selectedLanguage]
  );
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable<PageRow>(
    { columns, data: page }
  );
  return (
    <div className={classes['transaction-table-wrp']}>
      <Seo
        title={`${t('Transactions')} - HypeCrafter`}
        description=""
      />

      <div className={classes.breadcrumbs}>
        <Link to={Routes.HOME}> {t('Home')}</Link>
        {' > '}
        <Link to={Routes.TRANSACTIONS} onClick={() => { openModalAction(userId as string); }}>{t('Account')}</Link>
        {' > '}
        <span>{t('Transactions list')}</span>
      </div>
      <h2 className={classes['wallet-header-title']}>
        {t('Transactions list')}
      </h2>
      <table className={classes['transaction-table']}>
        <thead>
          {headerGroups.map(HeaderGroup => (
            <tr {...HeaderGroup.getHeaderGroupProps()} key={`Headers${HeaderGroup.id}`}>
              {HeaderGroup.headers.map(column => (
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
                    selectedLanguage,
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
                  return <RenderCell {...props} key={cell.row.id + cell.column.id} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes['pagination-wrp']}>
        {pagination}
      </div>
    </div>
  );
};
export default Transactions;
