'use client';

import { useQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ExamSkeleton } from './components/ExamSkeleton';
import { Questions } from './components/Questions';
import { Footer } from './components/Footer';
import { QuestionsNavigator } from './components/QuestionsNavigator';
import { useExam } from './hooks/useExam';

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
  const { allQuestions, isLoading } = useExam({ year: `${year}` });
  const searchParams = useSearchParams();
  const examMode = searchParams.get('mode') as 'immediate' | 'end';
  const key = searchParams.get('key');

  const STORAGE_ANSWERS = `answers-${year}-${key}`;
  const STORAGE_STEP = `step-${year}-${key}`;

  // Restore responses
  useEffect(() => {
    const savedResponses = localStorage.getItem(STORAGE_ANSWERS);
    if (savedResponses) {
      setUserResponses(JSON.parse(savedResponses));
    }
  }, []);

  useEffect(() => {
    const savedStep = localStorage.getItem(STORAGE_STEP);
    if (savedStep) {
      setStep(Number(savedStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_STEP, String(step));
  }, [step]);

  const currentQuestion = useMemo(() => {
    return allQuestions[step];
  }, [step, allQuestions]);

  const onConfirmSelect = useCallback(
    (questionIndex: number, answer: string) => {
      const savedAnswers = JSON.parse(
        localStorage.getItem(STORAGE_ANSWERS) || '[]',
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

      localStorage.setItem(STORAGE_ANSWERS, JSON.stringify(savedAnswers));
      setUserResponses(savedAnswers);

      setStep((prev) => prev + 1);
    },
    [allQuestions],
  );

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onPrevious = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onSelectPage = useCallback((page: number) => {
    setStep(page - 1);
  }, []);

  if (isLoading) return <ExamSkeleton />;

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
        className="bg-background relative -left-40 mx-auto mt-8 mb-30"
        style={{ width: `calc(83.33% - 320px)` }}
      >
        <Questions
          questionIndex={currentQuestion.index ?? 0}
          onConfirmSelect={onConfirmSelect}
          question={currentQuestion}
          mode={examMode}
        />

        <QuestionsNavigator
          step={step}
          totalQuestions={allQuestions.length}
          userAnswers={userResponses}
          onSelect={onSelectPage}
          mode={examMode}
        />
      </div>

      <Footer
        onSelectPage={onSelectPage}
        examId={key ?? ''}
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
