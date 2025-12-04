import { useCallback } from 'react';

export function useExamNavigation(setStep: (fn: (n: number) => number) => void) {
  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, [setStep]);

  const onPrevious = useCallback(() => {
    setStep((prev) => prev - 1);
  }, [setStep]);

  const onSelectPage = useCallback(
    (page: number) => {
      setStep(() => page - 1);
    },
    [setStep]
  );

  return { onNext, onPrevious, onSelectPage };
}
