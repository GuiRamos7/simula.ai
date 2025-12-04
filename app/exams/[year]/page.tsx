'use client';

import { useQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ExamSkeleton } from './components/ExamSkeleton';
import { Questions } from './components/Questions';
import { Footer } from './components/Footer';
import { QuestionsNavigator } from './components/QuestionsNavigator';

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
  onConfirmSelect: (
    questionIndex: number,
    selected: 'A' | 'B' | 'C' | 'D' | 'E',
  ) => void;
};

export type UserResponseProps = {
  questionIndex: number;
  selectedAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
  correctAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
};

const THREE_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 3;

const OFFSETS = [0, 50, 100, 150];
const LIMIT = 50;

export default function Home() {
  const [step, setStep] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponseProps[]>([]);
  const { year } = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedResponses = localStorage.getItem(
      `answers-${year}-${searchParams.get('key')}`,
    );
    if (savedResponses) {
      setUserResponses(JSON.parse(savedResponses));
    }
  }, []);

  const results = useQueries({
    queries: OFFSETS.map((offset) => ({
      queryKey: ['questions', year, offset],
      queryFn: () =>
        fetch(
          `https://api.enem.dev/v1/exams/${year}/questions?limit=${LIMIT}&offset=${offset}`,
        ).then((res) => res.json()),
      staleTime: THREE_DAYS_IN_MS,
      enabled: !!year,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);

  const allQuestions = useMemo(() => {
    return results
      .flatMap((r) => r.data?.questions || [])
      .sort((a: Question, b: Question) => a.index - b.index);
  }, [results]);

  const onConfirmSelect = useCallback(
    (questionIndex: number, answer: string) => {
      const savedAnswers = JSON.parse(
        localStorage.getItem(`answers-${year}-${searchParams.get('key')}`) ||
          '[]',
      );

      const existingIndex = savedAnswers.findIndex(
        (ans: any) => ans.questionIndex === questionIndex,
      );

      const newAnswer = {
        questionIndex: questionIndex,
        selectedAlternative: answer,
        correctAlternative:
          allQuestions[questionIndex - 1]?.correctAlternative ?? 'A',
      };
      if (existingIndex > -1) {
        savedAnswers[existingIndex] = newAnswer;
      } else {
        savedAnswers.push(newAnswer);
      }

      localStorage.setItem(
        `answers-${year}-${searchParams.get('key')}`,
        JSON.stringify(savedAnswers),
      );
      setUserResponses(savedAnswers);
      setStep((prevStep) => prevStep + 1);
    },
    [],
  );

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const onPrevious = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

  if (isLoading) return <ExamSkeleton />;

  if (step >= allQuestions.length) {
    return (
      <p className="p-10 text-center text-2xl font-bold">
        Parabéns! Você concluiu o simulado.
      </p>
    );
  }

  const currentQuestion = allQuestions[step];

  if (!currentQuestion) {
    return (
      <p className="p-10 text-center">
        Questão não encontrada. Iniciando a prova.
      </p>
    );
  }

  return (
    <>
      <div
        className="bg-background relative mb-30 -left-40 mx-auto mt-8"
        style={{ width: `calc(83.33% - 320px)` }}
      >
        <Questions
          questionIndex={currentQuestion.index ?? 0}
          onConfirmSelect={onConfirmSelect}
          question={currentQuestion}
          mode={searchParams.get('mode') as 'immediate' | 'end'}
        />
        <QuestionsNavigator
          step={step}
          totalQuestions={allQuestions.length}
          userAnswers={userResponses}
          onSelect={(e) => {
            console.log(e);
          }}
          mode={searchParams.get('mode') as 'immediate' | 'end'}
        />
      </div>
      <Footer
        examId={searchParams.get('key') ?? ''}
        onNext={onNext}
        onPrevious={onPrevious}
        currentQuestionIndex={currentQuestion.index}
        totalQuestionsAnswered={userResponses.length}
        totalQuestions={allQuestions.length}
        isNextDisabled={step === allQuestions.length - 1}
        isPreviousDisabled={step === 0}
        timeMode={
          (searchParams.get('timer') as 'progressive' | 'regressive') ??
          'progressive'
        }
      />
    </>
  );
}
