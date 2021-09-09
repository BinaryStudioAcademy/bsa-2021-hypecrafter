/* eslint-disable no-else-return */
import cn from 'classnames';
import { FC } from 'react';
import CardWithLink from '../../../../components/Card/CardWithLink';
import ProgressBar from '../../../../components/ProgressBar';
import Tag from '../../../../components/Tag';
import { useLocalization } from '../../../../providers/localization';
import classes from './styles.module.scss';

type Props = {
  to: string,
  tags: string[] | string;
  name: string;
  goal: number;
  percent: number;
  totalViews: number;
  isActive: boolean;
  isSuccess: boolean;
  category?: string;
  image?: string;
  rounded?: boolean;
};

const RecommendationCard: FC<Props> = ({
  to,
  tags,
  name,
  goal,
  percent,
  category,
  totalViews,
  isActive,
  isSuccess,
  image = 'https://dummyimage.com/600x400/000/fff.jpg&text=+',
  rounded = true
}) => {
  const { t } = useLocalization();

  const getStatus = () => {
    if (isActive) {
      return t('in progress');
    } else if (isSuccess) {
      return t('successful');
    } else {
      return t('unsuccessful');
    }
  };

  return (
    <CardWithLink to={to} image={image} rounded={rounded}>
      {category && <div className={classes.category}>{category}</div>}
      <div className={classes.title}>{name}</div>

      <div className={classes.tags}>
        {(Array.isArray(tags))
          ? tags.map(tag => <Tag key={tag} text={tag} />)
          : <Tag text={tags} />}
      </div>

      <div className={classes.views}>
        <span>{`${t('Total views')}: `}</span>
        <span>{totalViews}</span>
      </div>

      <div className={classes.status}>
        <span>{`${t('Status')}: `}</span>
        <span
          className={cn(classes['status-value'], {
            [classes['status-in-progress']]: isActive,
            [classes['status-successful']]: !isActive && isSuccess,
            [classes['status-unsuccessful']]: !isActive && !isSuccess,
          })}
        >
          {getStatus()}
        </span>
      </div>

      <ProgressBar goal={Math.floor(goal)} percent={Math.floor(percent)} />
    </CardWithLink>
  );
};

export default RecommendationCard;
