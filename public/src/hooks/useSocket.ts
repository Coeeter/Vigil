import { useContext } from 'react';
import { SocketContext } from '../components/SocketContext';

export default function useSocket() {
  return useContext(SocketContext);
}
