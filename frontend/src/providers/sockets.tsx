import { createContext, FC, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { env } from '../env';
import { useAuth } from '../hooks';

type ContextProps = {
  addSocketHandler: (event: string, handler: (...args: any[]) => void) => void,
  emitEvent: (event: string, data: any) => void,
  socket: Socket
};

const SocketsContext = createContext<ContextProps>({} as ContextProps);
const useSockets = () => useContext(SocketsContext);

const SocketProvider: FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const { isAuthorized, id } = useAuth();

  useEffect(() => {
    if (isAuthorized) {
      setSocket(io(env.server.sockets as string, { query: { userId: id as string } }) as Socket);
    }
  }, [isAuthorized]);

  const addSocketHandler = (event: string, handler: (...args: any[]) => void) => {
    (socket as Socket)?.on(event, handler);
  };

  const emitEvent = (event: string, data: any) => {
    (socket as Socket)?.emit(event, data);
  };

  const value: ContextProps = { emitEvent, addSocketHandler, socket: socket as Socket };

  return (
    <SocketsContext.Provider value={value}>
      {children}
    </SocketsContext.Provider>
  );
};

export default SocketProvider;
export { useSockets };
