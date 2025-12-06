'use client';
import { useParams, useSearchParams } from 'next/navigation';

import { ExamSkeleton } from './components/ExamSkeleton';
import { Questions } from './components/Questions';
import { Footer } from './components/Footer';
import { QuestionsNavigator } from './components/QuestionsNavigator';

import { useExam } from './hooks/useExam';
import { usePersistedStep } from './hooks/usePersistedStep';
import { usePersistedAnswers } from './hooks/usePersistedAnswers';
import { useCurrentQuestion } from './hooks/useCurrentQuestion';
import { useExamNavigation } from './hooks/useExamNavigation';
import { useConfirmAnswer } from './hooks/useConfirmAnswer';
import { ExamMode } from '@/app/types';

export default function Home() {
  const { year } = useParams();
  const searchParams = useSearchParams();
  const examMode = searchParams.get('mode') as ExamMode;
  const key = searchParams.get('key');
  const STORAGE_STEP = `step-${year}-${key}`;
  const STORAGE_ANSWERS = `answers-${year}-${key}`;

  const { allQuestions, isLoading, error,  } = useExam({
    year: `${year}`,
  });
  const { step, setStep } = usePersistedStep(STORAGE_STEP);
  const currentQuestion = useCurrentQuestion(allQuestions, step);
  const { answers, save } = usePersistedAnswers(STORAGE_ANSWERS);
  const { onNext, onPrevious, onSelectPage } = useExamNavigation({
    setStep,
    totalQuestions: allQuestions.length,
  });
  const onConfirmSelect = useConfirmAnswer({
    storageKey: STORAGE_ANSWERS,
    allQuestions,
    saveAnswers: save,
    goNext: onNext,
  });

  if (isLoading) return <ExamSkeleton />;
  if (!currentQuestion || error)
    return <p className="p-10 text-center">Questão não encontrada.</p>;

  return (
    <>
      <div
        className="bg-background relative -left-40 mx-auto mt-8 mb-30"
        style={{ width: `calc(83.33% - 320px)` }}
      >
        <Questions
          questionIndex={currentQuestion.index}
          onConfirmSelect={onConfirmSelect}
          question={currentQuestion}
          mode={examMode}
        />

        <QuestionsNavigator
          step={step}
          totalQuestions={allQuestions.length}
          userAnswers={answers}
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
        totalQuestionsAnswered={answers.length}
        totalQuestions={allQuestions.length}
        isNextDisabled={step === allQuestions.length - 1}
        isPreviousDisabled={step === 0}
        timeMode={searchParams.get('timer') as any}
      />
    </>
  );
}
