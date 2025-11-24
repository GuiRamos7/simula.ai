'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import ReactMarkdown from 'react-markdown';
import { useSearchParams } from 'next/navigation';

export type Alternative = {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  file: string | null;
  isCorrect: boolean;
};

export enum QuestionDisipline {
  'linguagens' = 'Linguagens e Código',
  'ciencias-humanas' = 'Ciências Humanas',
  'matematica' = 'Matemática',
  'ciencias-natureza' = 'Ciências da Natureza',
}

export type Question = {
  title: string;
  index: number;
  discipline: keyof typeof QuestionDisipline;
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
  questionIndex: number;
  onConfirmSelect: (
    questionIndex: number,
    selected: 'A' | 'B' | 'C' | 'D' | 'E',
  ) => void;
  mode: 'immediate' | 'end';
};

export const Questions = memo(
  ({ question, onConfirmSelect, questionIndex, mode }: QuestionProps) => {
    const [answerSelected, setAnswerSelected] = useState<
      null | 'A' | 'B' | 'C' | 'D' | 'E'
    >(null);

    console.log(answerSelected);

    const [showAnswer, setShowAnswer] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
      const storageKey = `answers-${question.year}-${searchParams.get('key')}`;
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');

      const existing = saved.find(
        (e: any) => e.questionIndex === questionIndex,
      );

      if (existing) {
        setAnswerSelected(existing.selectedAlternative);
        setShowAnswer(true);
      } else {
        setAnswerSelected(null);
        setShowAnswer(false);
      }
    }, [questionIndex]);

    const questionsAnswers = useMemo(() => {
      return question.alternatives.map((alt) => {
        const isCorrect = alt.letter === question.correctAlternative;
        const isSelected = answerSelected === alt.letter;

        let borderClass = 'border-pink-500/40';

        if (showAnswer) {
          if (isCorrect) borderClass = 'border-green-500 bg-green-500/10';
          else if (isSelected && !isCorrect)
            borderClass = 'border-red-500 bg-red-500/10';
          else borderClass = 'opacity-50';
        }

        return (
          <label
            key={alt.letter}
            htmlFor={alt.letter}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${borderClass}`}
          >
            <RadioGroupItem id={alt.letter} value={alt.letter} />
            <span className="mr-2 font-bold">{alt.letter})</span>

            {alt.text ? (
              <span className="text-sm font-medium">{alt.text}</span>
            ) : (
              <img
                className="w-fit max-w-[280px]"
                src={alt.file ?? ''}
                alt="Imagem alternativa"
              />
            )}
          </label>
        );
      });
    }, [question, showAnswer, answerSelected]);

    const handleConfirm = () => {
      if (answerSelected && mode === 'end') {
        onConfirmSelect(question.index, answerSelected);
        setAnswerSelected(null);
      }
      if (answerSelected && showAnswer) {
        onConfirmSelect(question.index, answerSelected);
        setAnswerSelected(null);
      }
      if (mode === 'immediate') {
        setShowAnswer(true);
      }
    };

    return (
      <div className="m-auto mb-30 flex w-full flex-col justify-center gap-5 p-5 lg:mb-0 lg:flex-row">
        {/* CONTEXTO */}
        <div className="question-header max-w-2xl flex-1">
          <div className="context flex flex-col items-center overflow-y-auto pr-2 text-base leading-relaxed whitespace-pre-line text-gray-800 lg:max-h-[80vh] dark:text-gray-300">
            <div className="block h-auto w-auto p-2 text-lg">
              <ReactMarkdown>
                {!!question.context
                  ? question.context
                  : question.alternativesIntroduction}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* ALTERNATIVAS */}
        <div className="question-answer flex w-full flex-col gap-4 border-0 p-5 md:min-w-[300px] md:border-l-2 md:border-gray-200 lg:ml-5 lg:w-96 lg:min-w-[500px] dark:md:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Questão {question.index}
          </h2>

          <span>
            {question.discipline ? QuestionDisipline[question.discipline] : ''}
          </span>

          <p className="text-md block h-auto w-auto border-b-2 border-gray-200 pb-4 md:mt-2 dark:border-gray-700">
            {!!question.context ? question.alternativesIntroduction : ''}
          </p>

          <RadioGroup
            disabled={showAnswer}
            value={answerSelected || ''}
            onValueChange={(v) => setAnswerSelected(v as any)}
          >
            {questionsAnswers}
          </RadioGroup>

          <Button
            onClick={handleConfirm}
            disabled={!answerSelected}
            variant="pink"
            className="min-h-14"
          >
            {showAnswer ? 'Próxima pergunta' : 'Confirmar resposta'}
          </Button>
        </div>
      </div>
    );
  },
);
