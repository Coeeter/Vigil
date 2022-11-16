import { device as Device } from 'aws-iot-device-sdk';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import { ClientEvent } from '../events/ClientEvent';
import { LambdaEvent } from '../events/LambdaEvent';
import BodyData from '../models/BodyData';
import User from '../models/User';

class DeviceController {
  io: Server;
  socket: Socket;
  device: Device;

  constructor(io: Server, socket: Socket, device: Device) {
    this.io = io;
    this.socket = socket;
    this.device = device;
  }

  public onGetUserEvent = (id: string, callback: (user: User) => void) => {
    this.device.subscribe(LambdaEvent.USER_RETRIEVED);
    this.device.publish(ClientEvent.GET_USER, JSON.stringify({ id }));
    this.device.on('message', (topic: string, payload: any) => {
      this.device.unsubscribe(LambdaEvent.USER_RETRIEVED);
      callback(JSON.parse(payload.toString()));
    });
  };

  public onCreateUserEvent = (
    name: string,
    gender: 'male' | 'female',
    birthday: number,
    contacts: string[],
    callBack: (id: string) => void
  ) => {
    const id = v4();
    const user = new User(id, name, gender, birthday, contacts);
    this.device.publish(ClientEvent.CREATE_USER, JSON.stringify(user));
    callBack(id);
  };

  public onDataCollectedEvent = (
    userId: string,
    heartRate: number,
    temperature: number,
    timeRecorded: Date,
    hasFell: boolean
  ) => {
    const data = new BodyData(
      v4(),
      userId,
      heartRate,
      temperature,
      timeRecorded,
      hasFell
    );
    this.device.publish(ClientEvent.DATA_COLLECTED, JSON.stringify(data));
  };
}

export default DeviceController;
