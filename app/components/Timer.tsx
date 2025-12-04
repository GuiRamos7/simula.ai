'use client';

import { useEffect, useState, useRef } from 'react';

type TimerMode = 'progressive' | 'regressive';

type TimerProps = {
  mode: TimerMode;
  initialTime?: number;
  storageKey: string;
  onFinish?: () => void;
};

export function Timer({
  mode,
  initialTime = 0,
  storageKey,
  onFinish,
}: TimerProps) {
  const [time, setTime] = useState<number>(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const parsed = JSON.parse(saved);
      const { time: savedTime, lastUpdate } = parsed;

      const now = Date.now();
      const diffSec = Math.floor((now - lastUpdate) / 1000);

      let next = savedTime;

      if (mode === 'progressive') {
        next = savedTime + diffSec;
      } else {
        next = savedTime - diffSec;
        if (next <= 0) {
          next = 0;
          onFinish?.();
        }
      }

      setTime(next);
      return;
    }

    if (mode === 'regressive') {
      setTime(initialTime);
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        let next = prev;

        if (mode === 'progressive') {
          next = prev + 1;
        } else {
          next = prev - 1;
          if (next <= 0) {
            clearInterval(intervalRef.current!);
            onFinish?.();
            next = 0;
          }
        }

        localStorage.setItem(
          storageKey,
          JSON.stringify({ time: next, lastUpdate: Date.now() }),
        );

        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [mode]);

  return (
    <span className="text-foreground text-sm leading-normal font-normal">
      {formatTime(time)} {mode === 'regressive' ? 'restantes' : ''}
    </span>
  );
}
