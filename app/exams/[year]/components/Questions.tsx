'use client';

import { useQueries } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ExamSkeleton } from './ExamSkeleton';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';

export type Alternative = {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  file: string | null;
  isCorrect: boolean;
};

export type Question = {
  title: string;
  index: number;
  discipline: string;
  language: string;
  year: number;
  context: string;
  files: string[];
  correctAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
  alternativesIntroduction: string;
  alternatives: Alternative[];
};

export type QuestionProps = {
  question: Question;
  key: number;
  onConfirmSelect: (
    questionIndex: number,
    selected: 'A' | 'B' | 'C' | 'D' | 'E',
  ) => void;
};

export const Questions = memo(
  ({ question, onConfirmSelect, key }: QuestionProps) => {
    const [answerSelected, setAnswerSelected] = useState<
      null | 'A' | 'B' | 'C' | 'D' | 'E'
    >(() => null);

    useEffect(() => {
      setAnswerSelected(null);
    }, [key]);

    const questionsAnswers = useMemo(() => {
      return question.alternatives.map((q) => (
        <label
          key={q.letter}
          htmlFor={q.letter}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-pink-500/40 p-4 transition-all data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/10"
        >
          <RadioGroupItem id={q.letter} value={q.letter} />
          <span className="mr-2 font-bold">{q.letter})</span>
          <span className="text-sm font-medium">{q.text}</span>
        </label>
      ));
    }, [question, answerSelected]);

    const handleConfirm = () => {
      if (answerSelected) {
        onConfirmSelect(question.index, answerSelected);
        setAnswerSelected(null);
      }
    };

    return (
      <div className="m-auto flex w-full flex-col justify-center gap-5 p-5 lg:flex-row">
        <div className="question-header max-w-2xl flex-1">
          <div className="context flex max-h-[80vh] flex-col items-center overflow-y-auto pr-2 text-base leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-300">
            <div className="block h-auto w-auto p-2 text-lg">
              <ReactMarkdown>{question.context}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="question-answer flex w-full flex-col gap-4 border-t border-l border-gray-200 p-5 md:min-w-[300px] lg:ml-5 lg:w-96 lg:min-w-[500px] lg:border-t-0 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Questão {question.index}
          </h2>
          <p className="text-md mt-2 block h-auto w-auto border-b border-gray-700 pb-4">
            {question.alternativesIntroduction}
          </p>
          <RadioGroup
            onValueChange={(value: 'A' | 'B' | 'C' | 'D' | 'E') =>
              setAnswerSelected(value)
            }
          >
            {questionsAnswers}
          </RadioGroup>

          <Button
            onClick={handleConfirm}
            disabled={!answerSelected}
            variant="pink"
            className="min-h-14"
          >
            Confirmar e Próxima Questão
          </Button>
        </div>
      </div>
    );
  },
);
