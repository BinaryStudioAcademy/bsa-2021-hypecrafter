import React from 'react';
import { View } from 'react-native';
import Accordion from '../../common/Accordion';

const FAQView = ({ faq }: { faq: { id: string, question: string, answer: string }[] }) => {
  return (
    <View>
      {
        faq.map(({ id, question, answer }) => (
          <Accordion question={question} answer={answer} key={id} />
        ))
      }
    </View>
  )
}

export default FAQView;