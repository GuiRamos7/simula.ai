'use client';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

export const Question = (question: any) => {
  const questionsAnswers = useMemo(() => {
    return question.question.alternatives.map((q) => (
      <Button className='cursor-pointer '>{q.text}</Button>
    ));
  }, [question]);

  console.log(111);

  return (
    <div className='p-5'>
      <div className='question-header'>
        <h1 className='whitespace-pre-line text-base leading-relaxed text-gray-800 font-bold'>
          {question.question.title}
        </h1>
        <span className='block w-fit p-2 my-2 bg-green-400 rounded-lg text-xs'>
          Disciplina: {question.question.discipline}
        </span>
        <div className='context max-h-100 overflow-hidden overflow-y-auto whitespace-pre-line text-base leading-relaxed text-gray-800'>
          <p className='text-center block w-auto h-auto'>
            {question.question.context}
          </p>
          <p className='text-center block w-auto h-auto'>
            {question.question.alternativesIntroduction}
          </p>
        </div>
      </div>
      <div className='question-answer grid grid-cols-2 gap-4 p-5'>
        {questionsAnswers}
      </div>
    </div>
  );
};

export default function Home() {
  const [step, setStep] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      fetch('https://api.enem.dev/v1/exams/2023/questions?limit=50').then(
        (res) => res.json()
      ),
  });

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Question question={data.questions[step]} />
    </div>
  );
}
