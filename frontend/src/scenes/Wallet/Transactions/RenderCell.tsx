import { FC } from 'react';
import { Cell, TableCellProps } from 'react-table';
import coinImg from '../../../assets/HypeCoin.png';
import { PageRow } from '../../../common/types';
import { TranslatorType } from '../../../providers/localization';

interface RenderCellProps {
  props: TableCellProps;
  cell: Cell<PageRow>;
  t: TranslatorType;
  selectedLanguage: string;
}
const RenderCell: FC<RenderCellProps> = (cellProps: RenderCellProps) => {
  const { selectedLanguage, props, cell, t } = cellProps;
  switch (cell.column.Header) {
    case t('Total'):
      return (
        <td {...props}>
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </td>
      );
    case t('Change'):
      return (
        <td {...props}>
          {cell.value > 0 ? '+' : false}
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </td>
      );
    case t('Balance'):
      return (
        <td {...props}>
          {cell.value}
          <img src={coinImg} alt="Coin" />
        </td>
      );
    case t('Date'): {
      if (selectedLanguage === 'ua') {
        return (
          <td {...props}>
            {new Date(cell.value).toLocaleDateString('uk-UA',
              { year: 'numeric', month: 'short', day: 'numeric' })}
          </td>
        );
      }
      return (
        <td {...props}>
          {new Date(cell.value).toLocaleDateString('en-EN',
            { year: 'numeric', month: 'short', day: 'numeric' })}
        </td>
      );
      break;
    }
    default:
      return (<td {...props}>{cell.value}</td>);
  }
};

export default RenderCell;
