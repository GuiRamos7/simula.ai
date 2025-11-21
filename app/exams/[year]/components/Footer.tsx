'use client';

import { Button } from '@/app/components/ui/button';
import { memo, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type FooterProps = {
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  totalQuestionsAnswered: number;
};

export const Footer = memo(
  ({
    onNext,
    onPrevious,
    isNextDisabled,
    isPreviousDisabled,
    currentQuestionIndex,
    totalQuestions,
    totalQuestionsAnswered,
  }: FooterProps) => {
    const percentComplete = (
      (totalQuestionsAnswered / totalQuestions) *
      100
    ).toFixed(2);

    return (
      <footer className="bg-background fixed inset-x-0 bottom-0 z-10 flex items-center justify-between border-t-2 border-gray-200 p-4 md:h-20 lg:h-25 dark:border-t dark:border-gray-700">
        <div className="m-auto flex w-5/6 justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden flex-col gap-1.5 text-right lg:flex">
              <div className="flex items-center gap-4">
                <p className="text-sm leading-normal font-medium text-white">
                  Questões respondidas: {totalQuestionsAnswered}/
                  {totalQuestions}
                </p>
                <p className="text-sm leading-normal font-normal text-[#9da6b9]">
                  02:45:30 restantes
                </p>
              </div>
              <div className="rounded-full bg-[#ddc3d8] dark:bg-[#3b4354]">
                <div
                  style={{ width: `${percentComplete ?? 0}%` }}
                  className="h-1.5 rounded-full bg-pink-500"
                />
              </div>
            </div>
            <Button variant="pink">
              <span className="truncate">Finalizar Simulado</span>
            </Button>
          </div>
          <div className="pagination flex gap-3 align-middle">
            <Button
              onClick={onPrevious}
              disabled={isPreviousDisabled}
              size="lg"
              variant="secondary"
              className="cursor-pointer"
            >
              <FaChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              variant="pink"
              size="lg"
              className="cursor-pointer"
            >
              Próxima
              <FaChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    );
  },
);
