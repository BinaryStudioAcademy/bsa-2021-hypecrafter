import { FC } from 'react';
import { Category } from '../../../interfaces';
import classes from './style.module.scss';

interface CategorySubtitleProps {
  item: Category;
  isSelected: boolean;
  onCategoryClick: (name: Category) => void;
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
    <div
      key={item.id}
      className={
        isSelected ? classes['subtopic-item-active'] : classes['subtopic-item']
      }
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      {item.name}
    </div>
  );
};

export default CategorySubtitle;
