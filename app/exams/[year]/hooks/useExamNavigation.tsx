import { useCallback } from 'react';

export type UseExamNavigationProps = {
  setStep: (fn: (n: number) => number) => void;
  totalQuestions: number;
};
export function useExamNavigation({
  setStep,
  totalQuestions,
}: UseExamNavigationProps) {
  const onNext = useCallback(() => {
    setStep((prev) => {
      console.log(prev, totalQuestions)
      if (prev === totalQuestions - 1) {
        return prev;
      }

      return prev + 1;
    });
  }, [setStep]);

  const onPrevious = useCallback(() => {
    setStep((prev) => prev - 1);
  }, [setStep]);

  const onSelectPage = useCallback(
    (page: number) => {
      setStep(() => page - 1);
    },
    [setStep],
  );

  return { onNext, onPrevious, onSelectPage };
}
