import { useCallback, useEffect, useState } from 'react';

export type UserResponseProps = {
  questionIndex: number;
  selectedAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
  correctAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
};

export function usePersistedAnswers(storageKey: string) {
  const [answers, setAnswers] = useState<UserResponseProps[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, [storageKey]);

  const save = useCallback(
    (newAnswers: UserResponseProps[]) => {
      setAnswers(newAnswers);
      localStorage.setItem(storageKey, JSON.stringify(newAnswers));
    },
    [storageKey],
  );

  return { answers, save };
}
