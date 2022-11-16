import socket from '../socket';

export default function fetch(event: string, ...data: any) {
  return new Promise<any>((resolve, reject) => {
    socket.emit(event, ...data, (payload: any) => {
      resolve(payload);
    });
  });
}
