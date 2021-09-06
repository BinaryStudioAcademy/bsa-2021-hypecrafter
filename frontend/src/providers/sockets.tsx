import { createContext, FC, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { env } from '../env';

let socket: Socket | null = null;

type ContextProps = {
  addSocketHandler: (event: string, handler: (...args: any[]) => void) => void
};

const SocketsContext = createContext<ContextProps>({} as ContextProps);
const useSockets = () => useContext(SocketsContext);

const SocketProvider: FC = ({ children }) => {
  if (!socket) {
    socket = io(env.server.url);
  }

  const addSocketHandler = (event: string, handler: (...args: any[]) => void) => {
    (socket as Socket).on(event, handler);
  };

  const value: ContextProps = { addSocketHandler };

  return (
    <SocketsContext.Provider value={value}>
      {children}
    </SocketsContext.Provider>
  );
};

export default SocketProvider;
export { useSockets };
