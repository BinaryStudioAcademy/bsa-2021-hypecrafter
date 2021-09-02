import React from 'react';
import { littleDateFormate } from './helpers';
import { Message } from './MessageInterface';
import classes from './styles.module.scss';

const messageMapper = (mess: Message) => (
  <div className={classes.message} key={mess.id}>
    <div className={classes.messageContent}>
      <span className={classes.name}>{mess.name}</span>
      <span className={classes.text}>{mess.text}</span>
    </div>
    <span className={classes.messageTime}>
      {`at ${littleDateFormate(mess.date)}`}
    </span>
  </div>
);

const ChatContentMemo = React.memo(({ messages }: { messages: Message[] }) => (
  <div className={classes.content}>
    {messages.map((mess: Message) => messageMapper(mess))}
  </div>
));

export default ChatContentMemo;
