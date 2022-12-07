import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createDevice from './config/DeviceConfig';
import { onDeviceConnected } from './controllers';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  },
});

io.on('connection', socket => {
  const device = createDevice(socket.id);
  device.on('connect', onDeviceConnected(io, socket, device));
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
