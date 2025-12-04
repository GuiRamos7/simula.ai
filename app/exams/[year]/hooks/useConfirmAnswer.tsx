import { QuestionType } from '@/app/types';
import { UserResponseProps } from './usePersistedAnswers';
import { useCallback } from 'react';

type UseConfirmAnswerProps = {
  storageKey: string;
  allQuestions: QuestionType[];
  saveAnswers: (answers: UserResponseProps[]) => void;
  goNext(): void;
};

export function useConfirmAnswer({
  storageKey,
  allQuestions,
  saveAnswers,
  goNext,
}: UseConfirmAnswerProps) {
  return useCallback(
    (questionIndex: number, selected: string) => {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');

      const existingIndex = saved.findIndex(
        (a: UserResponseProps) => a.questionIndex === questionIndex,
      );

      const newAnswer: UserResponseProps = {
        questionIndex,
        selectedAlternative: selected as any,
        correctAlternative:
          allQuestions[questionIndex - 1]?.correctAlternative ?? 'A',
      };

      if (existingIndex > -1) {
        saved[existingIndex] = newAnswer;
      } else {
        saved.push(newAnswer);
      }

      saveAnswers(saved);
      goNext();
    },
    [storageKey, allQuestions, saveAnswers, goNext],
  );
}
