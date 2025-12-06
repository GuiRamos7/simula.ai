import { QuestionType } from '@/app/types';
import { useMemo } from 'react';

export function useCurrentQuestion(allQuestions: QuestionType[], step: number) {
  return useMemo(
    () => allQuestions && allQuestions[step],
    [allQuestions, step],
  );
}
