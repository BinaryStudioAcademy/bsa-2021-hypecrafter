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
    case t('Type'):
      return (
        <td {...props}>
          {t(cell.value)}
        </td>
      );
    case t('Date'): {
      const date = new Date(cell.value);
      if (selectedLanguage === 'ua') {
        return (
          <td {...props}>
            {date.toLocaleDateString('uk-UA',
              { year: 'numeric', month: 'short', day: 'numeric' })}  {date.toLocaleTimeString()}
          </td>
        );
      }
      return (
        <td {...props}>
          {date.toLocaleDateString('en-EN',
            { year: 'numeric', month: 'short', day: 'numeric' })}  {date.toLocaleTimeString()}
        </td>
      );
      break;
    }
    default:
      return (<td {...props}>{cell.value}</td>);
  }
};

export default RenderCell;
