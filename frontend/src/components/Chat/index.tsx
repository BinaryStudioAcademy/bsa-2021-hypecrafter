import { useState } from 'react';
import classes from './styles.module.scss';

interface Message {
  id: number;
  text: string;
  name: string;
  date: string;
}

const Chat = () => {
  const messageDefault: Message[] = [];
  const [messages, setMessages] = useState(messageDefault);
  const [value, setValue] = useState('');
  const messageMapper = (mess: Message) => (
    <div className={classes.message} key={mess.id}>
      <div className={classes.messageContent}>
        <span className={classes.name}>{mess.name}</span>
        <span className={classes.text}>{mess.text}</span>
      </div>
      <span className={classes.messageTime}>{`at ${mess.date}`}</span>
    </div>
  );
  const sendMessage = () => {
    const newMessage: Message = {
      id: Number(new Date()),
      text: value,
      name: 'nobody',
      date: '01:05'
    };
    if (value.trim().length > 0) setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={classes.chat}>
      <div className={classes.content}>
        {messages.map((mess) => messageMapper(mess))}
      </div>
      <div className={classes.input}>
        <textarea
          className={classes.messageInput}
          name="message=text"
          id=""
          placeholder="..."
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          className={classes.send}
          type="button"
          value="send"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
