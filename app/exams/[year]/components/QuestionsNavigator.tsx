'use client';

import { Button } from '@/app/components/ui/button';
import { ExamMode } from '@/app/types';
import { nanoid } from 'nanoid';

type QuestionStatus = {
  questionIndex: number;
  selectedAlternative: string;
  correctAlternative: string;
};

type QuestionsNavigatorProps = {
  totalQuestions: number;
  userAnswers: QuestionStatus[];
  step: number; // 0-based
  onSelect: (index: number) => void;
  mode: ExamMode;
};

export function QuestionsNavigator({
  totalQuestions,
  userAnswers,
  step,
  onSelect,
  mode,
}: QuestionsNavigatorProps) {
  const renderRows = () => {
    const initialRows = Array.from({ length: 5 }, (_, i) => i + 1);
    const middleRow = Array.from({ length: 5 }, (_, i) => {
      if (step >= totalQuestions - 5) {
        return totalQuestions - 10 + i;
      }
      if (step <= 5) {
        return 6 + i;
      }
      return step + i;
    });
    const lastBlock = Array.from(
      { length: 5 },
      (_, i) => totalQuestions - i,
    ).reverse();

    return [...initialRows, ...middleRow, ...lastBlock];
  };

  const getStatusClass = (questionIndex: number) => {
    const found = userAnswers.find((x) => x.questionIndex === questionIndex);

    if (!found) return 'secondary';
    if (mode === 'end') return 'pink-answer';
    if (found.selectedAlternative === found.correctAlternative) return 'green';
    return 'red';
  };

  const renderRow = (items: number[]) => (
    <div className="mb-4 grid grid-cols-5 gap-3">
      {items?.map((num: number) => {
        const isActive = step === num - 1;

        return (
          <Button
            key={`num-${nanoid()}`}
            variant={getStatusClass(num)}
            onClick={() => onSelect(num)}
            className={`flex h-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
              isActive ? 'border-pink-500 ring-2 ring-pink-500' : ''
            }`}
          >
            {num}
          </Button>
        );
      })}
    </div>
  );

  return (
    <aside className="bg-background fixed top-0 right-0 z-10 hidden h-screen w-[320px] overflow-y-auto border-l-2 border-gray-200 p-6 pt-20 lg:block dark:border-gray-700">
      <h2 className="text-primary mb-4 text-lg font-bold">Questões</h2>
      {renderRow(renderRows())}
    </aside>
  );
}
