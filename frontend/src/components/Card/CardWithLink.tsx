import { ComponentProps, FC } from 'react';
import Card from '.';
import Link from '../Link';

type Props = ComponentProps<typeof Card> & {
  to: string,
};

const CardWithLink: FC<Props> = ({
  to,
  image,
  rounded,
  children
}) => (
  <Link to={to}>
    <Card image={image} rounded={rounded}>
      {children}
    </Card>
  </Link>
);

export default CardWithLink;
