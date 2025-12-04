import { useEffect, useState } from 'react';

export const usePersistedStep = (storageKey: string) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setStep(Number(saved));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, String(step));
  }, [step, storageKey]);

  return { step, setStep };
};
