import { FC, ReactNode } from 'react';
import { Accordion as AccordionBS } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props {
  accordions:{
    id: string;
    question: ReactNode | string;
    answer: ReactNode | string;
  }[];
}

const Accordion: FC<Props> = ({ accordions }) => (
  <AccordionBS defaultActiveKey="0" className={classes.main}>
    {accordions.map(({ id, question, answer }) => (
      <AccordionBS.Item eventKey="1" className={classes.item} key={id}>
        <AccordionBS.Header className={classes.header}>{question}</AccordionBS.Header>
        <AccordionBS.Body className={classes.body}>
          {answer}
        </AccordionBS.Body>
      </AccordionBS.Item>
    ))}
  </AccordionBS>
);

export default Accordion;
