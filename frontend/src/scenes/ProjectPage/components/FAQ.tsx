import { FC } from 'react';
import Accordion from '../../../components/Accordion';
import classes from '../styles.module.scss';

interface FAQProps {
  faqs: { id: string, question: string, answer: string }[];
}

const FAQ: FC<FAQProps> = ({ faqs }) => (
  <div className={classes.faqs}>
    <Accordion items={faqs} />
  </div>
);

export default FAQ;
