'use client';

import { useQueries } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ExamSkeleton } from './components/ExamSkeleton';
import { Questions } from './components/Questions';

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
  selectedAlternative: string;
};

const THREE_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 3;

const OFFSETS = [0, 50, 100, 150];
const LIMIT = 50;

export default function Home() {
  const [step, setStep] = useState(0);
  const { year } = useParams();

  const [userResponses, setUserResponses] = useState<UserResponseProps[]>([]);

  useEffect(() => {
    const savedResponses = localStorage.getItem('answers');
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

  console.log(userResponses);

  const isLoading = results.some((r) => r.isLoading);

  const allQuestions = useMemo(() => {
    return results
      .flatMap((r) => r.data?.questions || [])
      .sort((a: Question, b: Question) => a.index - b.index);
  }, [results]);

  const onConfirmSelect = useCallback(
    (questionIndex: number, answer: string) => {
      const savedAnswers = JSON.parse(localStorage.getItem('answers') || '[]');

      const existingIndex = savedAnswers.findIndex(
        (ans: any) => ans.questionIndex === questionIndex,
      );

      const newAnswer = {
        questionIndex: questionIndex,
        selectedAlternative: answer,
      };

      if (existingIndex > -1) {
        setUserResponses((prev) => [
          ...prev.filter((ans) => ans.questionIndex !== questionIndex),
          newAnswer,
        ]);
        savedAnswers[existingIndex] = newAnswer;
      } else {
        savedAnswers.push({
          questionIndex: questionIndex,
          selectedAlternative: answer,
        });
      }

      localStorage.setItem('answers', JSON.stringify(savedAnswers));

      setStep((prevStep) => prevStep + 1);
    },
    [],
  );

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
    <div className="bg-background mx-auto mt-8 w-5/6">
      <Questions
        key={currentQuestion.index ?? 0}
        onConfirmSelect={onConfirmSelect}
        question={currentQuestion}
      />
    </div>
  );
}
