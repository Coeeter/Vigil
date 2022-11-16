import { createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

let socket: Socket;

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: Props) => {
  useEffect(() => {
    socket = io('http://localhost:8080');
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
