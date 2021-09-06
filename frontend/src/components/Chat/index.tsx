import { useState } from 'react';
import ChatContentMemo from './ChatContent';
import { Message } from './MessageInterface';
import classes from './styles.module.scss';

interface ChatProps {
  nickName: string;
  role?: 'backer' | 'owner' | undefined;
}

const Chat: React.FC<ChatProps> = ({
  nickName,
  role = undefined
}) => {
  const messageDefault: Message[] = [];
  const [messages, setMessages] = useState(messageDefault);
  const [value, setValue] = useState('');

  const sendMessage = () => {
    const newMessage: Message = {
      id: Number(new Date()),
      text: value,
      name: nickName,
      role,
      date: new Date()
    };

    if (value.trim().length > 0) {
      setMessages((prev) => [...prev, newMessage]);
      setValue('');
    }
  };

  return (
    <div className={classes.chat}>
      <ChatContentMemo messages={messages} />
      <div className={classes.input}>
        <textarea
          className={classes.messageInput}
          name="message=text"
          id=""
          placeholder="..."
          value={value}
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
