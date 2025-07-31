import { useEffect, useState } from 'react';

export const Timer = ({ duration, onExpire }: { duration: number; onExpire: () => void }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div style={{ fontSize: '24px', color: '#ffcc00' }}>{seconds}s</div>;
};