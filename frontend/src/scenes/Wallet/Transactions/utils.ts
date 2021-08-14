import { Column } from 'react-table';
import { TranslatorType } from '../../../providers/localization';

export interface HeaderI {
  date: string;
  items: string;
  type: string;
  total: number;
  change: number;
  balance: number;
}

export interface PageRow {
  id: string;
  userId: string;
  date: string;
  item: string;
  type: string;
  total: number;
  change: number;
  balance: number;
}

export const getColumns = (t:TranslatorType):Column<HeaderI>[] => {
  const widthDate = 99;
  const widthItems = 396;
  const widthType = 198;
  const widthTotal = 148;
  const widthBalance = 148;
  return ([
    {
      Header: t('Date'),
      accessor: 'date',
      maxWidth: widthDate,
      minWidth: widthDate,
      width: widthDate
    },
    {
      Header: t('Items'),
      accessor: 'items',
      maxWidth: widthItems,
      minWidth: widthItems,
      width: widthItems
    },
    {
      Header: t('Type'),
      accessor: 'type',
      maxWidth: widthType,
      minWidth: widthType,
      width: widthType
    },
    {
      Header: t('Total'),
      accessor: 'total',
      maxWidth: widthTotal,
      minWidth: widthTotal,
      width: widthTotal
    },
    {
      Header: t('Balance'),
      accessor: 'balance',
      maxWidth: widthBalance,
      minWidth: widthBalance,
      width: widthBalance
    }
  ]);
};
