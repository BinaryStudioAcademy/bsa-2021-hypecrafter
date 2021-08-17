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
  <div>
    {accordions.map(({ id, question, answer }) => (
      <AccordionBS defaultActiveKey="0" className={classes.main} key={id}>
        <AccordionBS.Item eventKey="1" className={classes.item}>
          <AccordionBS.Header className={classes.header}>{question}</AccordionBS.Header>
          <AccordionBS.Body className={classes.body}>
            {answer}
          </AccordionBS.Body>
        </AccordionBS.Item>
      </AccordionBS>
    ))}
  </div>
);

export default Accordion;
