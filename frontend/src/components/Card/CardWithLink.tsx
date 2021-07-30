import { FC, ComponentProps } from 'react';
import Link from '../Link';
import Card from '.';

type Props = ComponentProps<typeof Card> & {
  to: string,
}

const CardComponent: FC<Props> = ({
  to,
  category,
  tags,
  name,
  description,
  goal,
  percent,
  image,
  rounded
}) => (
  <Link to={to}>
    <Card
      category={category}
      tags={tags}
      name={name}
      description={description}
      goal={goal}
      percent={percent}
      image={image}
      rounded={rounded}
    />
  </Link>
);

export default CardComponent;
