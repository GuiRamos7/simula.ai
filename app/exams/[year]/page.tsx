'use client';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';

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
  onConfirmSelect: (selected: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  params: {
    year: string;
  };
};

export const Question = ({
  question,
  onConfirmSelect,
  params,
}: QuestionProps) => {
  const [answerSelected, setAnswerSelected] = useState<
    null | 'A' | 'B' | 'C' | 'D' | 'E'
  >(null);

  const renderFiles = useMemo(() => {
    return question.files.map((questionFile) => (
      <img className='mb-5 max-w-[400px] self-center' src={questionFile} />
    ));
  }, [question]);

  const questionsAnswers = useMemo(() => {
    return question.alternatives.map((q) => (
      <Button
        key={q.letter}
        onClick={() => {
          setAnswerSelected(q.letter);
        }}
        className={`cursor-pointer border-3 ${
          q.letter === answerSelected ? 'border-indigo-500' : ''
        }`}
        size='custom-xl'
        variant='outline'
      >
        {q.letter}) {q.text}
      </Button>
    ));
  }, [question, answerSelected]);

  return (
    <div className='p-5 w-fit flex gap-5 m-auto'>
      <div className='question-header flex-1 max-w-2xl'>
        <h1 className='mb-10 whitespace-pre-line text-base leading-relaxed text-gray-800 font-bold'>
          {question.title}
        </h1>
        <div className='flex flex-col items-center context max-h-[80vh] overflow-hidden overflow-y-auto whitespace-pre-line text-base leading-relaxed text-gray-800'>
          <div className='files w-fit '>{renderFiles}</div>
          <p className='block w-auto h-auto text-lg'>
            {question.alternativesIntroduction}
          </p>
        </div>
      </div>

      <div className='question-answer flex flex-col gap-4 p-5 w-md'>
        {questionsAnswers}
      </div>
    </div>
  );
};

export default function Home() {
  const [step, setStep] = useState(0);
  const { year } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      fetch(`https://api.enem.dev/v1/exams/${year}/questions?limit=50`).then(
        (res) => res.json()
      ),
  });

  const onConfirmSelect = useCallback(
    (resposta: string) => {
      console.log(resposta);
      setStep(step + 1);
      const savedAnswers = localStorage.getItem('respostas')
        ? JSON.parse(localStorage.getItem('respostas') as string)
        : [];

      const answers = localStorage.getItem('respostas')
        ? [...savedAnswers, resposta]
        : [resposta];
      localStorage.setItem('respostas', JSON.stringify([...answers]));
    },
    [step]
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Question
        onConfirmSelect={onConfirmSelect}
        question={data.questions[4]}
      />
    </div>
  );
}

{
  /* {answerSelected ? (
        <Button
          className='w-full'
          onClick={() => onConfirmSelect(answerSelected)}
        >
          CONFIRMAR
        </Button>
      ) : (
        ''
      )} */
}
