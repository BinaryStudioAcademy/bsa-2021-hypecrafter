import { FC } from 'react';
import { Container } from 'react-bootstrap';
import Card from '../Card';
import classes from './styles.module.scss';

const CardComponent: FC = () => (
  <Container className={classes.cards}>
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile']}
      name="Mendi: Real Brain Training - Anytime, Anywhere"
      description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
      goal={1000}
      percent={30}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
      name="Card Title"
      description="Card Description"
      goal={50000}
      percent={70}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
      name="Card Title"
      description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
      goal={10000}
      percent={50}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile']}
      name="Mendi: Real Brain Training - Anytime, Anywhere"
      description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
      goal={1000}
      percent={30}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
      name="Card Title"
      description="Card Description"
      goal={50000}
      percent={70}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
      name="Card Title"
      description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
      goal={10000}
      percent={50}
      image="https://source.unsplash.com/random/800x600"
    />
    <Card
      to="/"
      category="Health"
      tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
      name="Card Title"
      description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
      goal={10000}
      percent={50}
      image="https://source.unsplash.com/random/800x600"
    />
  </Container>
);

export default CardComponent;
