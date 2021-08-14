import { FC } from 'react';
import { Cell, TableCellProps } from 'react-table';
import coinImg from '../../../assets/HypeCoin.png';
import { TranslatorType } from '../../../providers/localization';
import { HeaderI } from './utils';

interface RenderCellProps {
  props: TableCellProps;
  cell: Cell<HeaderI>;
  t: TranslatorType;
}
const RenderCell: FC<RenderCellProps> = (cellProps: RenderCellProps) => {
  const { props, cell, t } = cellProps;
  console.log(cellProps);
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
    default:
      return (<td {...props}>{cell.value}</td>);
  }
};

export default RenderCell;
