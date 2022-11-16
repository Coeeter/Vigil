import io from 'socket.io-client';
import { ClientEvent } from './events/ClientEvent';
import fetch from './utils/fetch';

const socket = io('http://localhost:8080');

export let signedIn = false;

socket.on('connect', async () => {
  signedIn = await isRegistered();
});

export async function isRegistered() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  if (!tokenFromLocalStorage) return false;
  const response = await fetch(ClientEvent.GET_USER, tokenFromLocalStorage);
  const token = response.Item.id;
  return token == tokenFromLocalStorage;
}

socket.connect();

export default socket;
