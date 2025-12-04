import { ExamMode } from '../types';

export const getAlternativeClasses = ({
  isCorrect,
  isSelected,
  showAnswer,
  mode,
}: {
  isCorrect: boolean;
  isSelected: boolean;
  showAnswer: boolean;
  mode: ExamMode;
}) => {
  if (showAnswer && mode === 'immediate') {
    if (isCorrect) return 'border-green-500 bg-green-500/10';
    if (isSelected) return 'border-red-500 bg-red-500/10';
    return 'opacity-50';
  }

  if (showAnswer) return 'opacity-50';

  return 'border-pink-500/40';
};
