import { FC } from 'react';
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
      className={
        isSelected
          ? `${classes['subtopic-item']} ${classes['subtopic-item-active']}`
          : classes['subtopic-item']
      }
      onClick={handleClick}
    >
      {item.name}
    </Button>
  );
};

export default CategorySubtitle;
