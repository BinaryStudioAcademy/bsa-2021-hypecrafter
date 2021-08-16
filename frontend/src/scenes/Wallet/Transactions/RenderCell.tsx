import { FC } from 'react';
import { Cell, TableCellProps } from 'react-table';
import coinImg from '../../../assets/HypeCoin.png';
import { PageRow } from '../../../common/types';
import { TranslatorType } from '../../../providers/localization';

interface RenderCellProps {
  props: TableCellProps;
  cell: Cell<PageRow>;
  t: TranslatorType;
}
const RenderCell: FC<RenderCellProps> = (cellProps: RenderCellProps) => {
  const { props, cell, t } = cellProps;
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
