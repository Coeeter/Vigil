import { device as Device } from 'aws-iot-device-sdk';
import { Server, Socket } from 'socket.io';
import { ClientEvent } from '../events/ClientEvent';
import DeviceController from './DeviceController';

export const onDeviceConnected = (
  io: Server,
  socket: Socket,
  device: Device
) => {
  const deviceController = new DeviceController(io, socket, device);
  return () => {
    socket.on(ClientEvent.GET_USER, deviceController.onGetUserEvent);
    socket.on(ClientEvent.CREATE_USER, deviceController.onCreateUserEvent);
    //prettier-ignore
    socket.on(ClientEvent.DATA_COLLECTED, deviceController.onDataCollectedEvent);
  };
};
