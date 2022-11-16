import { device as Device } from 'aws-iot-device-sdk';
import { env } from './EnvConfig';

export default function createDevice(id: string): Device {
  return new Device({
    ...env,
    clientId: id,
  });
}
