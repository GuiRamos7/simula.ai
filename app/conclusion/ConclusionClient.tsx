'use client';

import { usePersistedAnswers } from '@/app/exams/[year]/hooks/usePersistedAnswers';
import { LuTrophy } from 'react-icons/lu';
import { Button } from '../components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ConclusionClient({ key, year }: any) {
  const STORAGE_ANSWERS = `answers-${year}-${key}`;
  const { answers } = usePersistedAnswers(STORAGE_ANSWERS);

  const result = useMemo(
    () =>
      answers.reduce(
        (acc, curr) => {
          if (curr.correctAlternative === curr.selectedAlternative) {
            return { ...acc, correct: acc.correct + 1 };
          }
          return { ...acc, wrong: acc.wrong + 1 };
        },
        { correct: 0, wrong: 0 },
      ),
    [answers],
  );

  const renderAnswers = useMemo(() => {
    return answers.map((answer) => {
      const isCorrect =
        answer.correctAlternative === answer.selectedAlternative;

      const correctAnswerStyle =
        'border-green-200 bg-green-50 p-4 text-center text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300';
      const incorrectAnswerStyle =
        'border-red-200 bg-red-50 p-4 text-center text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300';
      return (
        <div
          key={`key-${answer.questionIndex}`}
          className={`w-full rounded-lg border p-2 text-sm font-semibold ${isCorrect ? correctAnswerStyle : incorrectAnswerStyle}`}
        >
          Questão {answer.questionIndex}: Sua escolha{' '}
          {answer.selectedAlternative} | Alternativa correta{' '}
          {answer.correctAlternative}
        </div>
      );
    });
  }, [answers]);

  return (
    <main className="m-auto w-[95%] md:w-3/6">
      <div className="flex w-full flex-col items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:p-10 dark:border-[#3B4354] dark:bg-[#1C1F27]">
        <div className="text-primary flex size-20 items-center justify-center rounded-full bg-pink-300/50 dark:bg-pink-500/50">
          <LuTrophy size={40} className="text-pink-500" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-primary tracking-light text-[32px] leading-tight font-bold">
            Exame Concluído!
          </h1>
          <p className="text-base leading-normal font-normal text-neutral-600 dark:text-neutral-400">
            Confira seu desempenho e as sugestões para melhorar seus estudos.
          </p>
        </div>
        <div className="my-2 h-px w-full bg-neutral-200 dark:bg-neutral-800"></div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-4 text-center dark:border-neutral-200/25 dark:bg-[#1C1F27]">
            <p className="text-sm leading-normal font-medium text-neutral-600 dark:text-neutral-400">
              Tempo Gasto
            </p>
            <p className="tracking-light text-2xl leading-tight font-bold text-black dark:text-white">
              04:30:00
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-900 dark:bg-green-900/20">
            <p className="text-sm leading-normal font-medium text-green-800 dark:text-green-300">
              Questões Certas
            </p>
            <p className="tracking-light text-2xl leading-tight font-bold text-green-900 dark:text-green-200">
              {result.correct}
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-900/20">
            <p className="text-sm leading-normal font-medium text-red-800 dark:text-red-300">
              Questões Erradas
            </p>
            <p className="tracking-light text-2xl leading-tight font-bold text-red-900 dark:text-red-200">
              {result.wrong}
            </p>
          </div>
        </div>
        <div className="flex max-h-[200px] w-full flex-col gap-2 overflow-auto">
          {renderAnswers}
        </div>

        <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row">
          <Button variant="pink" size="full" className="max-h-20 w-full">
            Voltar à Página Principal
          </Button>
        </div>
      </div>
    </main>
  );
}
