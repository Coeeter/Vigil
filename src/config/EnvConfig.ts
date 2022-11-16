import { config } from 'dotenv';
config();

['KEY_PATH', 'CERT_PATH', 'CA_PATH', 'HOST'].forEach(key => {
  if (process.env[key]) return;
  throw new Error(`Environment variable ${key} is missing`);
});

export const env = {
  keyPath: process.env.KEY_PATH!,
  certPath: process.env.CERT_PATH!,
  caPath: process.env.CA_PATH!,
  host: process.env.HOST!,
};
