import { useEffect } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number = 10000,
  dependency: any[] = []
) {
  useEffect(() => {
    callback();
    const interval = setInterval(() => callback(), delay);
    return () => {
      clearInterval(interval);
    };
  }, dependency);
}
