import { useEffect, useState } from 'react';
import ChatContentMemo from './ChatContent';
import { Message } from './MessageInterface';
import classes from './styles.module.scss';

interface ChatProps {
  nickName: string;
  userRole?: 'backer' | 'owner' | undefined;
}

const Chat: React.FC<ChatProps> = ({ nickName, userRole = undefined }) => {
  const messageDefault: Message[] = [];
  const [messages, setMessages] = useState(messageDefault);
  const [value, setValue] = useState('');
  // const { addSocketHandler, socket, emitEvent } = useSockets();
  // const { setNewNotificationsAction } = useAction();
  const sendMessage = () => {
    const newMessage: Message = {
      id: Number(new Date()),
      text: value,
      name: nickName,
      role: userRole,
      date: new Date(),
    };

    if (value.trim().length) {
      setMessages((prev) => [...prev, newMessage]);
      setValue('');
    }
  };

  useEffect(() => {
    // const chatId = '7370b5e1-6437-4333-b284-04e5dd25fb90';
    fetch('http://localhost:3002/chat/messages').then(content => console.log(content));
    // // if (socket) {
    // //   addSocketHandler(
    //     SocketActions.JOIN_CHAT,
    // //     (notification: NotificationType) => {
    // //       setNewNotificationsAction(notification);
    // //     }
    // //   );
    // // }

    // // example this must be on chat component

    // const teamId = '7370b5e1-6437-4333-b284-04e5dd25fb90';
    // const textMessage = 'mmmmmmmmkvkkkf';
    // console.log('emit event');

    // emitEvent(SocketActions.JOIN_CHAT, { teamId });
    // emitEvent(SocketActions.NEW_MESSAGE, { text: textMessage });
    // addSocketHandler(SocketActions.NEW_MESSAGE_CREATED, console.log);
  }, []);

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
