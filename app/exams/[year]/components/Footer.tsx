'use client';

import { Timer } from '@/app/components/Timer';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/components/ui/input';
import { memo, useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type FooterProps = {
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  totalQuestionsAnswered: number;
  timeMode: 'progressive' | 'regressive';
  examId: string;
  onSelectPage: (page: number) => void;
};

export const Footer = memo(
  ({
    examId,
    onNext,
    onPrevious,
    isNextDisabled,
    isPreviousDisabled,
    currentQuestionIndex,
    totalQuestions,
    totalQuestionsAnswered,
    timeMode,
    onSelectPage,
  }: FooterProps) => {
    const percentComplete = (
      (totalQuestionsAnswered / totalQuestions) *
      100
    ).toFixed(2);

    const [pageSelected, setPageSelected] = useState(0);

    useEffect(() => {
      setPageSelected(currentQuestionIndex);
    }, [currentQuestionIndex]);

    return (
      <footer className="bg-background fixed inset-x-0 bottom-0 z-10 flex items-center justify-between border-t-2 border-gray-200 p-4 md:h-20 lg:h-25 dark:border-t dark:border-gray-700">
        <div className="m-auto flex w-5/6 flex-col-reverse justify-between gap-2 md:flex-row">
          <div className="flex w-full items-center gap-4">
            <div className="hidden flex-col gap-1.5 text-right lg:flex">
              <div className="flex items-center gap-4">
                <p className="text-primary text-sm leading-normal font-medium">
                  Questões respondidas: {totalQuestionsAnswered}/
                  {totalQuestions}
                </p>
                <Timer
                  mode={timeMode}
                  initialTime={11 * 60 * 60} // 11h
                  storageKey={`exam-${examId}-${timeMode}`}
                  onFinish={() => alert('Seu tempo acabou!')}
                />
              </div>
              <div className="rounded-full bg-[#ddc3d8] dark:bg-[#3b4354]">
                <div
                  style={{ width: `${percentComplete ?? 0}%` }}
                  className="h-1.5 rounded-full bg-pink-500"
                />
              </div>
            </div>
            <Button variant="pink" size="lg" className="w-full md:w-fit">
              Finalizar Simulado
            </Button>
          </div>
          <div className="pagination flex w-full justify-between gap-3 align-middle md:justify-end">
            <Button
              onClick={onPrevious}
              disabled={isPreviousDisabled}
              size="lg"
              variant="secondary"
              className="w-[45%] cursor-pointer md:w-fit"
            >
              <FaChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Input
              className="h-10 max-w-fit min-w-[33px] text-center"
              type="number"
              min={1}
              max={totalQuestions}
              value={pageSelected}
              onChange={(e) => setPageSelected(Number(e.target.value))}
              onBlur={(e) => onSelectPage(Number(e.target.value))}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  onSelectPage(Number(pageSelected));
                }
              }}
            />
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              variant="pink"
              size="lg"
              className="w-[45%] cursor-pointer md:w-fit"
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
