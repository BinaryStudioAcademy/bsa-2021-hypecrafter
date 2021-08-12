import { FC } from 'react';
import classnames from 'classnames';
import { Category } from '../../../interfaces';
import Button from '../../../../../components/Button';
import classes from './style.module.scss';

interface CategorySubtitleProps {
  item: Category;
  isSelected: boolean;
  onCategoryClick: CallableFunction;
}

const CategorySubtitle: FC<CategorySubtitleProps> = ({
  item,
  onCategoryClick,
  isSelected
}) => {
  const handleClick = () => {
    onCategoryClick(item);
  };

  return (
    <Button
      key={item.id}
      onClick={handleClick}
      className={classnames({
        [classes['subtopic-item']]: true,
        [classes['subtopic-item-active']]: isSelected
      })}
    >
      {item.name}
    </Button>
  );
};

export default CategorySubtitle;
