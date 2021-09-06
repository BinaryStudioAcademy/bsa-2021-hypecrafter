import React from 'react';
import { littleDateFormate } from './helpers';
import { Message } from './MessageInterface';
import classes from './styles.module.scss';

const addLabel = (text: string, styleClass: string) => (
  <span className={styleClass}>{text.toUpperCase()}</span>
);

const messageMapper = (message: Message) => {
  let label = '';
  let style = '';
  if (message.role) {
    label = message.role;
    style = label === 'backer' ? classes.backer : classes.owner;
  }

  return (
    <div className={classes.message} key={message.id}>
      <div className={classes.messageContent}>
        <span className={classes.name}>
          {message.name}
          {label ? addLabel(label, style) : ''}
        </span>
        <span className={classes.text}>{message.text}</span>
      </div>
      <span className={classes.messageTime}>
        {littleDateFormate(message.date)}
      </span>
    </div>
  );
};

const ChatContentMemo = React.memo(({ messages }: { messages: Message[] }) => (
  <div className={classes.content}>
    {messages.map((message: Message) => messageMapper(message))}
  </div>
));

export default ChatContentMemo;
