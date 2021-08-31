import { Column } from 'react-table';
import { PageRow } from '../../../common/types';
import { TranslatorType } from '../../../providers/localization';

export const getColumns = (t:TranslatorType):Column<PageRow>[] => {
  const widthDate = 136;
  const widthItems = 433;
  const widthType = 235;
  const widthTotal = 185;
  // const widthBalance = 148;
  return ([
    {
      Header: t('Date'),
      accessor: 'createdAt',
      maxWidth: widthDate,
      minWidth: widthDate,
      width: widthDate
    },
    {
      Header: t('Items'),
      accessor: 'item',
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
    }
    // ,
    // {
    //   Header: t('Balance'),
    //   accessor: 'balance',
    //   maxWidth: widthBalance,
    //   minWidth: widthBalance,
    //   width: widthBalance
    // }
  ]);
};
