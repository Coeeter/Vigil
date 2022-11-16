import { useEffect } from 'react';
import { ClientEvent } from '../events/ClientEvent';
import useSocket from '../hooks/useSocket';
import User from '../models/User';

export default function AuthChecker() {
  const socket = useSocket();

  const id = localStorage.getItem('token');
  socket?.emit(ClientEvent.GET_USER, id, (user: { Item: User }) => {
    console.log(user);
  });

  return <div></div>;
}
