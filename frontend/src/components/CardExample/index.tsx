import { FC } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../ProjectCard';
import Card from '../Card';
import CardWithLink from '../Card/CardWithLink';
import classes from './styles.module.scss';

const CardExampleComponent: FC = () => (
  <>
    <h2>Without links</h2>
    <Container className={classes.cards}>
      <Card
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 1</h2>
      </Card>
      <Card
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 2</h2>
      </Card>
      <Card
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 3</h2>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, iure.
      </Card>
      <Card
        image="https://source.unsplash.com/random/800x600"
        rounded
      >
        <h2>Card 4</h2>
      </Card>
      <Card
        image="https://source.unsplash.com/random/800x600"
        rounded
      >
        <h2>Card 5</h2>
      </Card>
    </Container>
    <h2>With links</h2>
    <Container className={classes.cards}>
      <CardWithLink
        to="/"
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 1</h2>
      </CardWithLink>
      <CardWithLink
        to="/"
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 2</h2>
      </CardWithLink>
      <CardWithLink
        to="/"
        image="https://source.unsplash.com/random/800x600"
      >
        <h2>Card 3</h2>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, iure.
      </CardWithLink>
      <CardWithLink
        to="/"
        image="https://source.unsplash.com/random/800x600"
        rounded
      >
        <h2>Card 4</h2>
      </CardWithLink>
      <CardWithLink
        to="/"
        image="https://source.unsplash.com/random/800x600"
        rounded
      >
        <h2>Card 5</h2>
      </CardWithLink>
    </Container>
    <h2>Project cards</h2>
    <Container className={classes.cards}>
      <ProjectCard
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
      <ProjectCard
        to="/"
        category="Health"
        tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
        name="Card Title"
        description="Card Description"
        goal={50000}
        percent={70}
        image="https://source.unsplash.com/random/800x600"
      />
      <ProjectCard
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
      <ProjectCard
        to="/"
        category="Health"
        tags={['Bike', 'Speed', 'Mile']}
        name="Mendi: Real Brain Training - Anytime, Anywhere"
        description={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it over 2000 years old.`}
        goal={1000}
        percent={30}
        image="https://source.unsplash.com/random/800x600"
        rounded
      />
      <ProjectCard
        to="/"
        category="Health"
        tags={['Bike', 'Speed', 'Mile', 'Bike', 'Speed', 'Mile']}
        name="Card Title"
        description="Card Description"
        goal={50000}
        percent={70}
        image="https://source.unsplash.com/random/800x600"
        rounded
      />
    </Container>
  </>
);

export default CardExampleComponent;
